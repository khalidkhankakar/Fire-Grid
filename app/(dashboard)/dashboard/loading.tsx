import { Filter } from "lucide-react";
import SearchBar from "../_components/search-bar";
import BoardsFilter from "../_components/boards-filter";
import { CATEGORY_FILTER, DATETIME_FILTER, ORDER_FILTER } from "@/contants";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='w-[100vw] md:w-full overflow-x-none pb-12 dashboard-section overflow-y-scroll   h-[calc(100vh-64px)] p-4'>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex items-center justify-between gap-x-2'>

                    <h1 className='text-xl md:text-3xl'>
                        Personal Workspace loading
                    </h1>
                    <div className='block md:hidden'>
                        <Skeleton className="h-8 w-12" />
                    </div>
                </div>
                <div className="cursor-not-allowed">
                    <SearchBar />
                </div>

            </div>

            <div className='my-3 rounded-md cursor-not-allowed bg-white px-3 py-3 dark:bg-dark-1 flex flex-wrap items-center shadow-md justify-between gap-y-2'>

                <div className='flex text-slate-400 items-center gap-x-2'>
                    <Filter fill='#94a3b8' className='w-6 h-6' />
                    <span className='font-semibold'>Filter</span>
                </div>
                <div className='flex gap-x-2 cursor-not-allowed'>
                    <BoardsFilter filter={CATEGORY_FILTER} />
                    <BoardsFilter filter={DATETIME_FILTER} />
                    <BoardsFilter filter={ORDER_FILTER} />
                </div>

            </div>

            <div className='my-5 flex flex-wrap items-center justify-center w-full '>
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <BoardCardSkeleton key={index} />
                    ))
                }
            </div>

        </div>
    )
}


export const BoardCardSkeleton = () => {
    return (
        <Card className="w-[250px] border relative bg-white dark:bg-dark-1 shadow-lg m-2 overflow-hidden">
            {/* Skeleton for image */}
            <div className="relative h-40">
                <Skeleton className="h-full w-full" />
            </div>

            <CardHeader className="p-2">
                <div className="flex items-center justify-between">
                    {/* Skeleton for title */}
                    <Skeleton className="h-5 w-3/5" />
                    {/* Skeleton for favorite icon */}
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
            </CardHeader>

            <CardContent className="p-3 pt-0">
                <div className="flex items-center justify-between">
                    {/* Skeleton for visibility */}
                    <div className="flex items-center text-sm text-gray-500">
                        <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    {/* Skeleton for createdAt */}
                    <div className="flex items-center text-sm text-gray-500">
                        <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                {/* Conditional skeleton for button */}
                <Skeleton className="mt-2 h-8 w-full" />

                {/* Skeleton for actions */}
                <div className="absolute top-3 right-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
            </CardContent>
        </Card>

    )
}