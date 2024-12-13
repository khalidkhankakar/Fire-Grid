import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BoardCardProps {
    id: string,
    title: string,
    createdBy: string,
    image: string,
    category: string,
    visibility: string,
    orgId: string,
    createdAt: string,
    isFavorite: boolean
}

const BoardCard = ({
    id,
    title,
    image,
    category,
    visibility,
    isFavorite,
}: BoardCardProps) => {
    return (
        <Link
            href={`/board/${id}`}
            className='bg-slate-400 mx-auto  dark:bg-gray-700 rounded-lg flex flex-col gap-y-1 p-1 h-52 md:h-44 w-[80%] md:w-56 cursor-pointer'
        >
            <Image src={image} width={100} height={100} alt={'coverimg'} className='rounded-lg p-0.5 w-full h-2/3 object-cover' />

            <div className='px-3 flex justify-between items-center'>
                <p className='text-sm'>{title}</p>
                {/* TODO: ADD FAVORITES FUNCTIONALITY */}
                <Star className={cn('w-6 h-6', isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white')} />
            </div>

            <div className='px-3 flex items-center'>
                <p className='text-xs text-gray-200 dark:text-gray-400'>{category}{' '}</p>
                <span> | </span>
                <p className='text-xs text-red-200 '>{' '}{visibility}</p>
                {/* TODO: ADD FAVORITES FUNCTIONALITY */}
            
            </div>

        </Link>
    )
}

export default BoardCard
