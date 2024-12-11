'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TaskCardEditForm } from "./task-card-edit-form";
import TaskCardPreview from "./task-card-preview";

import { LabelType } from "@/lib/db/schemas/card.schema";

interface TableModelProps {
    cardId: string,
    backgroundColor: string,
    title: string,
    backgroundImage: string,
    label: LabelType,
    description: string,
    deadline: string,
    children: React.ReactNode
}

export function TaskCardModel({ children, cardId, backgroundImage, deadline, description, label, backgroundColor, title }: TableModelProps) {
    const [show, setShow] = useState(false);
    const sampleTask = {
        coverImage: backgroundImage,
        title: title,
        cardColor: backgroundColor,
        labels: label?.data || [],
        description: description,
        deadline: deadline
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white dark:bg-dark-1">
                <DialogHeader>
                    <DialogTitle>{show ? "Edit Task" : "Task details"}</DialogTitle>
                </DialogHeader>

                {
                    show ?
                        <TaskCardEditForm
                            id={cardId}
                            {...sampleTask}
                            setShow={setShow} /> :
                        <TaskCardPreview
                            {...sampleTask}
                            setShow={setShow} />
                }

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



