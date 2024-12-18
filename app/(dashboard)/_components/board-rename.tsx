'use client';
import { useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { renameBoard } from "@/actions/board.actions";

interface BoardRenameProps {
    children: React.ReactNode
    title: string
    id: string
}

const BoardRename = (
    {
        children,
        title,
        id,
    }: BoardRenameProps
) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const [newTitle, setNewTitle] = useState(title);
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const handleRename = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            renameBoard({ title: newTitle, boardId: id }).then((res) => {
                closeRef.current?.click();
                if (res.success) toast({ title: "Board renamed" });
                if (!res.success) toast({ title: res.status, variant: 'destructive' })
            }).catch((err) => toast({ title: err.status, variant: 'destructive' }));
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Type something else to rename this board</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRename} className="flex flex-col gap-y-2 w-full">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={newTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)} />
                    </div>
                    <Button type="submit">{isPending ? 'Renaming...' : 'Rename'}</Button>
                </form>
                <DialogClose ref={closeRef}>
                    Cancel
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default BoardRename
