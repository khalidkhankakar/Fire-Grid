"use client";

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { useOrganization } from "@clerk/nextjs"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

import { createBoard } from "@/actions/board.actions"

import { backgroundArray, CATEGORY_FILTER } from "@/contants"
import { boardFormSchema } from "@/lib/utils"

export function BoardForm() {
    const [selectedBackground, setSelectedBackground] = useState<string>(backgroundArray[0]);
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const { organization } = useOrganization()
    // TODO: Also add functionaly to edit board making value dynamic
    const form = useForm<z.infer<typeof boardFormSchema>>({
        resolver: zodResolver(boardFormSchema),
        defaultValues: {
            title: "",
            category: "",
            orgId: "",
            visibility: searchParams?.get('type') === "team" ? "team" : "personal",
            background: selectedBackground,
            type: "",
        },
    })


    function onSubmit(values: z.infer<typeof boardFormSchema>) {
        if (searchParams?.get('type') === "team" && !organization) {
            return toast({ title: "Please select or create an organization to create a team board" })
        }
        if (searchParams?.get('type') === "template") {
            startTransition(() => {
                createBoard({ ...values, type: "template", orgId: organization?.id }).then((res) => {
                    if (res.success) toast({ title: res.status })
                    else toast({ title: res.status, variant: "destructive" })
                }
                ).catch((err) => toast({ title: err.status, variant: "destructive" }))
            })
        }
        startTransition(() => {
            createBoard({ ...values, orgId: organization?.id }).then((res) => {
                if (res.success) toast({ title: res.status })
                else toast({ title: res.status, variant: "destructive" })
            }
            ).catch((err) => toast({ title: err.status, variant: "destructive" }))
        })
    }
    const handleBackgroundClick = (background: string) => {
        setSelectedBackground(background);
        form.setValue("background", background);
    };



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
                <div className=" w-full rounded-lg">
                    <Image
                        src={selectedBackground}
                        width={100}
                        height={100}
                        alt="Selected background"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </div>


                <div className="flex flex-col gap-y-2">
                    <FormField
                        control={form.control}
                        name="background"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-gray-500 text-sm">Board Background</FormLabel>
                                <div className="flex flex-wrap gap-2">
                                    {backgroundArray.map((background) => (
                                        <div
                                            key={background}
                                            className={`h-12 w-16 rounded-md overflow-hidden cursor-pointer ${selectedBackground === background ? "ring-2 ring-blue-500" : ""
                                                }`}
                                            onClick={() => handleBackgroundClick(background)}
                                        >
                                            <Image
                                                src={background}
                                                width={100}
                                                height={100}
                                                alt="Background"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-500 text-sm my-2">Board Title</FormLabel>
                            <FormControl>
                                <Input placeholder="JsMastery journey" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-500 text-sm my-2">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Work" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        CATEGORY_FILTER.data.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>{category.Text}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormControl>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-500 text-sm my-2">Board Title</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormDescription >
                                <p className=" my-2 text-center  text-xs text-amber-700">If you want to Visibilty mode {searchParams?.get('type') === "team" ? "Personal" : "Team"} <Link href={`${searchParams?.get('type') === "team" ? "/dashboard" : "/dashboard?type=team"}`} className="underline text-blue-600" >click here</Link></p>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit">{isPending ? "Creating..." : "Create"}</Button>
            </form>
        </Form>
    )


}