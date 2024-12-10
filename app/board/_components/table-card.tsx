'use client';
import { ChevronsLeftRight, ChevronsRightLeft, Ellipsis } from 'lucide-react'
import React, { useState } from 'react'
import CreateCardButton from './create-card-button';
import CreateTable from './create-table';

interface TableCardProps {
    id: string,
    title: string
    backgroundColor: string | null,
    boardId: string,
    position: number
}

const TableCard = ({
    id,
    title,
    backgroundColor,
    boardId,
    position
}: TableCardProps) => {

    const [cardCollapse, setCardCollapse] = useState<boolean>(false)
    // TODO: Fetching the tables cards using swr or tanstack query

    if (cardCollapse) {
        return (
            <div className='h-fit max-h-52 py-3   rounded-lg overflow-y-auto ' style={{ backgroundColor: backgroundColor || '#000' }}>
                <div className='flex flex-col gap-y-3 items-center justify-between ' >
                    <div className='px-2 flex items-center space-x-2'>
                        <ChevronsLeftRight className='hover:cursor-pointer hover:p-1 rounded-md hover:bg-gray-400' onClick={() => setCardCollapse(false)} />
                    </div>
                    <p className='text-sm tb-text'>{title}</p>
                </div>

            </div>
        )
    }

    return (
        <div className='h-fit max-h-52 w-64 rounded-lg overflow-y-auto flex-shrink-0 p-2' style={{ backgroundColor: backgroundColor || '#000' }}>
            <div className='flex items-center justify-between ' >
                <p className='text-sm'>{title}</p>
                <div className='flex items-center space-x-2'>

                    <ChevronsRightLeft className='hover:cursor-pointer rounded-md hover:p-1 hover:bg-gray-400' onClick={() => setCardCollapse(true)} />
                    <Ellipsis />
                </div>
            </div>

            <div>
                {/* list cards here */}
            </div>
            <div>
                {/* card button */}
               <CreateCardButton tableId={id} cardCount={0} />
            </div>

        </div>
    )
}

export default TableCard
