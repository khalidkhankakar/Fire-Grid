import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { BoardForm } from "./board-form"


export function CreateBoardButton({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Dialog  >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] md:w-[80%] max-w-xl  overflow-y-auto bg-white dark:bg-dark-1">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal">Create Board</DialogTitle>
        </DialogHeader>
        <div>
          <BoardForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
