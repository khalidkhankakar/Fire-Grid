import { cn } from '@/lib/utils'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Overlay from './overlay'

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
            className='group w-48 h-44 flex  flex-col justify-center items-center  mx-auto my-8 relative'
        >
            <Overlay />

            <div style={{ backgroundImage: `url(${image})` }}
                className="bg-gray-300 h-full w-full rounded-lg shadow-md bg-cover bg-center"></div>
            <div className="w-2/3 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                <div className="py-2 text-center font-semebold tracking-wide text-gray-800">{title}</div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-400">
                    <h1 className="text-gray-800 font-bold ">$129</h1>
                </div>
            </div>

            {/* TODO: ADD FAVORITES FUNCTIONALITY */}
            <Star className={cn('w-6 h-6 absolute top-2 right-2  group-hover:block md:hidden block', isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white')} />

        </Link>
    )
}

export default BoardCard
