
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Pencil, Trash } from "lucide-react"
import BoardRename from "./board-rename"
import DeleteConfirmation from "./delete-confirmation"
import { startTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { deleteBoard } from "@/actions/board.actions"

const BoardActions = (
    {
        id,
        title,
        children,
    }: {
        id: string,
        title: string,
        children: React.ReactNode
    }
) => {
    const {toast} = useToast() 

    const handleDeleteBoard = () => {
        if(!id) return
        startTransition(() => {
            deleteBoard({boardId:id}).then((res) => {
                if(res.success) toast({ title: res.status });
                if(!res.success) toast({ title: res.status, variant: 'destructive' })
            })
            .catch((err) => toast({ title: err.status, variant: 'destructive' }))
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent side="right" className="flex flex-col p-2 w-36 items-center bg-white dark:bg-dark-1 gap-2 ">
                <BoardRename id={id} title={title}>
                    <Button variant={'secondary'} className="flex w-full items-center cursor-pointer " asChild>
                        <div>

                            <Pencil className=" h-4 w-4" />
                            <p className="text-sm ">Rename</p>
                        </div>
                    </Button>
                </BoardRename>
                <DeleteConfirmation onConfirm={handleDeleteBoard}>
                    <Button variant={'secondary'} className="flex  w-full items-center">
                        <Trash className=" h-4 w-4" />
                        <p className="text-sm ">Delete</p>
                    </Button>
                </DeleteConfirmation>
            </PopoverContent>
        </Popover>
    )
}

export default BoardActions
