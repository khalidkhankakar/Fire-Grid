import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CreateBoardButton() {
  return (
    <Dialog  >
      <DialogTrigger asChild>
        <Button variant="ghost" asChild>
          <div className="bg-blue-500 hover:bg-blue-600 h-36 w-56 rounded-lg border flex items-center flex-col cursor-pointer justify-center text-white ">
            <Plus />
            <span>Create Board</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-96 overflow-y-auto bg-white dark:bg-dark-1">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal">Create Board</DialogTitle>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-y-4">

            <div className=" w-full rounded-lg">
              <Image src={"/assets/img1.jpg"} width={100} height={100} alt="bacground" className="w-full h-32   object-fill" />
            </div>

            <div className="flex flex-col  gap-y-2">
              <p className="text-gray-500 text-sm">Board Background</p>
              <div className="flex flex-wrap mx-auto gap-2">
                <Image src={"/assets/img1.jpg"} width={100} height={100} alt="bacground" className="h-12 w-16 rounded-md object-contain" />
                <Image src={"/assets/img1.jpg"} width={100} height={100} alt="bacground" className="h-12 w-16 rounded-md object-contain" />
                <Image src={"/assets/img1.jpg"} width={100} height={100} alt="bacground" className="h-12 w-16 rounded-md object-contain" />
                <Image src={"/assets/img1.jpg"} width={100} height={100} alt="bacground" className="h-12 w-16 rounded-md object-contain" />
                <Image src={"/assets/img1.jpg"} width={100} height={100} alt="bacground" className="h-12 w-16 rounded-md object-contain" />

              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-500 text-sm">Board Name</label>
              <Input type="text" placeholder="JS Mastery Journey" className="border border-gray-300 rounded-md p-2" />
            </div>

            <div className="flex flex-col">
            <label className="text-gray-500 text-sm my-2">Visibilty</label>
              <Input type="text" value={'Personal'} disabled className="border border-gray-300 rounded-md p-2" />
              <div className="text-xs text-amber-500 mt-1">If you want to Visibilty mode public <Link href={'/dashboard?type=team'} className="underline text-blue-600" >click here</Link></div>
            </div>

            <Button >Create</Button>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
