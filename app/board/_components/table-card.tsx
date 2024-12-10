'use client';
import { Ellipsis } from 'lucide-react'
import React from 'react'
import CreateCardButton from './create-card-button';
import { useQuery } from '@tanstack/react-query';
import { getTable } from '@/actions/table.actions';
import TaskCard from './task-card';
import { TableSkeleton } from './table-skeleton';

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
}: TableCardProps) => {
    const { data,error, isLoading } = useQuery({
        queryKey: ['table', id],
        queryFn: () => getTable(id),
    })


    if (isLoading) {
        return <TableSkeleton />
    }
    if(error) {
       return <p>Oops! Something went wrong. Please return back</p>
    }

    console.log({tabledata:data})
    return (
        <div className='h-fit max-h-2/3 w-64 rounded-lg overflow-y-auto flex-shrink-0 p-2' style={{ backgroundColor: backgroundColor || '#000' }}>
            <div className='flex items-center justify-between ' >
                <p className='text-sm'>{title}</p>
                <div className='flex items-center space-x-2'>
                    <Ellipsis />
                </div>
            </div>

            <div className='flex flex-col gap-y-2 my-2'>
                {/* list cards here */}
                {
                    data?.tableCards.map((card) => (
                        <TaskCard key={card.id} title={card.title} backgroundColor={card?.backgroundColor || '#9ca3af' } />
                    ))
                }
            </div>
            <div>
                {/* card button */}
                <CreateCardButton tableId={id} cardCount={data?.tableCards.length || 0} />
            </div>

        </div>
    )
}

export default TableCard
