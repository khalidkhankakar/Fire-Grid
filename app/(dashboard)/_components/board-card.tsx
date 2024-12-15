'use client';
import {  Calendar, CassetteTape, Ellipsis, Heart } from 'lucide-react'
import Link from 'next/link'
import BoardActions from './board-actions'
import { Card, CardContent,  CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface BoardCardProps {
    id: string,
    title: string,
    createdBy: string,
    image: string,
    visibility: string,
    orgId: string,
    createdAt: string,
    isFavorite: boolean
}

const BoardCard = ({
    id,
    title,
    image,
    visibility,
    isFavorite,
}: BoardCardProps) => {

    return (
        <Card className="w-[250px] border relative bg-white dark:bg-dark-1 shadow-lg  m-2 overflow-hidden">
            <div className="relative h-40">
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <CardHeader className="p-2">
                <div className="flex items-center justify-between">
                    <Link href={`/board/${id}`} className=" font-semibold hover:underline">{title}</Link>
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                    <CassetteTape className="w-4 h-4 mr-1" />
                    <span>{visibility}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>12/12/2023</span>
                </div>
                <BoardActions
                id={id}
                title={title}
                >
                <Ellipsis className="w-6 h-6 absolute top-3 cursor-pointer right-4" />
                </BoardActions>
            </CardContent>
        </Card>
    );
};

export default BoardCard;
