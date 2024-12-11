"use client"

import { z } from "zod"
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { createCard } from "@/actions/card.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"



const createCardSchema = z.object({
    title: z.string().min(2).max(50),
})

interface CreateCardButtonProps {
    tableId: string
    cardCount: number
}

const CreateCardButton = (
    {
        tableId,
        cardCount,
    }: CreateCardButtonProps
) => {
    const [isShowForm, setIsShowForm] = useState(false)
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof createCardSchema>>({
        resolver: zodResolver(createCardSchema),
        defaultValues: {
            title: "",
        },
    })

    const {isPending, mutate} = useMutation({
        mutationFn: createCard,
        onSuccess: async(data) => {
            queryClient.invalidateQueries({ queryKey: ['table', tableId]})
            setIsShowForm(false)
            form.reset()
            if (data.success) toast({ title: data.status })
            if (!data.success) toast({ title: data.status, variant: 'destructive' })

        },
        onError: (err) => {
            form.reset()
            toast({ title: err.message, variant: 'destructive' })
            setIsShowForm(false)
        }
    })

    function onSubmit(values: z.infer<typeof createCardSchema>) {
        // if (!tableId || !cardCount || !values.title) return
        mutate({ tableId, title: values.title, position: cardCount })
    }
    return (
        <Form {...form}>
            <div
                className={`py-2 px-3 bg-slate-500 hover:bg-slate-600 dark:bg-gray-800 flex items-center gap-x-2 cursor-pointer dark:hover:bg-gray-600/20 rounded-lg  transition-all duration-300`}>
                {
                    isShowForm ?
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 w-full">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Table Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">

                                <Button className="py-1 font-normal" type="submit">{isPending ? 'Creating...' : 'Create'}</Button>
                                <Button onClick={() => setIsShowForm(false)} variant={'icon-active'} type="button" asChild>
                                    <div>
                                        <X />
                                    </div>
                                </Button>
                            </div>
                        </form>
                        : <div onClick={() => setIsShowForm(true)} className='flex items-center gap-x-2 cursor-pointer'>
                            <Plus className="w-4 h-4" />
                            <span className='text-xs'>Add Card</span>
                        </div>
                }
            </div>
        </Form>
    )
}

export default CreateCardButton
