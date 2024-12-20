import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center ">
            <Loader className="animate-spin h-10 w-10" />
        </div>
    )
}