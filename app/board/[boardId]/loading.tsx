import { Loader } from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <Loader className="animate-spin h-10 w-10" />
        </div>
    )
}