import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BoardForm } from "./board-form"


{/* todo: add create board button */ }
{/* <div className="bg-blue-500 hover:bg-blue-600 h-36 w-56 rounded-lg border flex items-center flex-col cursor-pointer justify-center text-white ">
          <Plus />
          <span>Create Board</span>
        </div> */}
export function CreateBoardButton({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Dialog  >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-96 overflow-y-auto bg-white dark:bg-dark-1">
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
