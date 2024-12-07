import React from 'react'
import { Filter } from 'lucide-react'

import BoardsFilter from './boards-filter'
import SearchBar from './search-bar'
import { SearchParams } from '../dashboard/page'
import { CATEGORY_FILTER, DATETIME_FILTER, ORDER_FILTER } from '@/contants'


interface BoardsDataProps {
    searchParams: SearchParams | undefined
}

const BoardsData = ( {searchParams} : BoardsDataProps) => {
    return (
        <div className='w-full  min-h-[calc(100vh-64px)] p-4'>
            <div className='flex flex-col md:flex-row justify-between '>
                <h1 className='text-xl md:text-3xl'>{ searchParams?.type === "team" ?  "Team Workspace" : searchParams?.type === "favorite" ? "Favorite Workspace" : "Personal Workspace"}</h1>
                <SearchBar />
            </div>

            <div className=' my-3  rounded-md bg-white px-3 py-3 dark:bg-dark-1 flex flex-wrap items-center shadow-md justify-between gap-y-2 '>
                <div className='flex text-slate-400 items-center gap-x-2'>
                    <Filter fill='#94a3b8' className='w-6 h-6 ' />
                    <span className='font-semibold'>Filter</span>
                </div>
                <div className='flex gap-x-2'>
                    <BoardsFilter filter={CATEGORY_FILTER} />
                    <BoardsFilter filter={DATETIME_FILTER}/>
                    <BoardsFilter filter={ORDER_FILTER}/>
                </div>

            </div>
        </div>
    )
}

export default BoardsData
