'use client';
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { updateTable } from "@/actions/table.actions";


interface TableModelProps {
    tableId: string,
    backgroundColor: string,
    title: string,
    children: React.ReactNode
}

export function TableModel({ children, tableId, backgroundColor, title }: TableModelProps) {
    const [newTitle, setNewTitle] = useState(title);
    const [colors, setColors] = useState(backgroundColor);
    const closeRef = useRef<HTMLButtonElement>(null);

    const { toast } = useToast();

    const queryClient = useQueryClient();
    const { isPending: editPending, mutate: editMutate } = useMutation({
        mutationFn: updateTable,
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['table', tableId], exact: true })
            closeRef.current?.click();
            if (data.success) toast({ title: data.status })
            if (!data.success) toast({ title: data.status, variant: 'destructive' })
        },
        onError: (err) => {
            toast({ title: err.message, variant: 'destructive' })
        }
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editMutate({ tableId, title: newTitle, backgroundColor: colors });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[80%] max-w-md max-h-96 overflow-y-auto rounded-lg bg-white dark:bg-dark-1">
                <DialogHeader>
                    <DialogTitle>Edit Table</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" type="text" onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
                    </div>
                    <div>
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" name="color" type="color" onChange={(e) => setColors(e.target.value)} value={colors} />
                    </div>

                    <Button className="w-full" type="submit">{editPending ? 'Updating...' : 'Update Table'}</Button>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button ref={closeRef} type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
