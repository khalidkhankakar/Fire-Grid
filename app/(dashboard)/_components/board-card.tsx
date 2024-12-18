'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, CassetteTape, Ellipsis } from 'lucide-react'

import BoardActions from './board-actions'
import BoardFavorite from './board-favorite';

import { forkedBoard } from '@/actions/board.actions';



interface BoardCardProps {
    id: string,
    title: string,
    createdBy: string,
    image: string,
    visibility: string,
    orgId: string,
    createdAt: string,
    isFavorite: boolean
    type?: string | null
}

const BoardCard = ({
    id,
    title,
    image,
    visibility,
    isFavorite,
    type
}: BoardCardProps) => {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const {userId} = useAuth();
    const { toast } = useToast();

    const handleForked = () => {
        if(!userId || !id || type !== 'template' ) return toast({title: 'Missing', description: 'Something is missing to perform this action', variant: 'destructive'}) 
        startTransition(() => {
            forkedBoard({boardId: id, userId}).then((res) => {
                if(res.success) toast({title: res.status});
                if(!res.success) toast({title: res.status, variant: 'destructive'})
            }).catch((err) => toast({title: err.status, variant: 'destructive'}))
        })
        
    }

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
                    <BoardFavorite boardId={id} isFavorite={isFavorite} />
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <div className='flex items-center justify-between'>

                <div className="flex items-center text-sm text-gray-500">
                    <CassetteTape className="w-4 h-4 mr-1" />
                    <span>{visibility}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>12/12/2023</span>
                </div>
                </div>
                {(searchParams.get('type')==="template" && type==="template") && <Button className='mt-2 w-full' onClick={handleForked} variant="outline">
                    {isPending ? 'Forking...' : 'Fork Board'}
                </Button>}
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
