"use client"

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"

import { Plus, X } from 'lucide-react'
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
    const queryClient = useQueryClient();

    const [isShowForm, setIsShowForm] = useState(false)
    const { toast } = useToast();
    const form = useForm<z.infer<typeof createTableSchema>>({
        resolver: zodResolver(createTableSchema),
        defaultValues: {
            title: "",
        },
    })

    const mutate = useMutation({
        mutationFn: async ({ boardId, title, position }: { boardId: string, title: string, position: number }) => {
           const data = await createTable(boardId, position, title);
            return data
            
        }
        ,onError: (err) => {
            toast({ title: err.message, variant: 'destructive' })
        }
        ,
        onSettled: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['board', boardId] });
            if (data?.success) toast({ title: data?.status })
            if (!data?.success) toast({ title: data?.status, variant: 'destructive' })
            setIsShowForm(false)
            form.reset();
        }
    });
    function onSubmit(values: z.infer<typeof createTableSchema>) {
        if (!boardId || !values.title) return
        mutate.mutate({ boardId, title: values.title, position: tableCount })
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

                                <Button className="py-1 font-normal" type="submit">{mutate.isPending ? 'Creating...' : 'Create'}</Button>
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
