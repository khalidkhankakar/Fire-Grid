"use client"

import { z } from "zod"
import { Plus, X } from 'lucide-react'
import React, { useState, useTransition } from 'react'
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
import { createTable } from "@/actions/table.actions"
import { useToast } from "@/hooks/use-toast"



const createTableSchema = z.object({
    title: z.string().min(2).max(50),
})

interface CreateTableProps {
    boardId: string
    tableCount: number
}

const CreateTable = (
    {
        boardId,
        tableCount,
    }: CreateTableProps
) => {
    const [isShowForm, setIsShowForm] = useState(false)
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof createTableSchema>>({
        resolver: zodResolver(createTableSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof createTableSchema>) {
        if (!boardId || !tableCount || !values.title) return
        startTransition(() => {
            createTable(boardId, tableCount, values.title).then((res) => {
                if (res.success) toast({ title: res.status })
                if (!res.success) toast({ title: res.status, variant: 'destructive' })
            }).catch((err) => {
                toast({ title: err.status, variant: 'destructive' })
            }).finally(() => {
                setIsShowForm(false)
            })
        })
    }
    return (

        <Form {...form}>
            <div className='w-64 flex-shrink-0 py-2 px-3 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-300 h-fit'>
                {
                    isShowForm ?
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
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
                            <Plus />
                            <span className='text-[1rem] font-semibold'>Create Table</span>
                        </div>

                }

            </div>
        </Form>
    )
}

export default CreateTable
