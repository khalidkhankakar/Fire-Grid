'use client';
import React, { startTransition, useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

import { Star } from 'lucide-react'

import { addFavorite, removeFavorite } from '@/actions/favriote.actions';


interface BoardFavoriteProps {
    boardId: string,
    isFavorite: boolean
}

const BoardFavorite = ({ boardId, isFavorite }: BoardFavoriteProps) => {

    const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite)
    const { userId } = useAuth();

    const { toast } = useToast()

    const handleToggleFavorite = (isFav: boolean, id: string) => {

        if (!id || !userId) return;
        if (isFav) {
            startTransition(() => {
                removeFavorite({ boardId: id, userId }).then((res) => {
                    setLocalIsFavorite(false)
                    if (res.success) toast({ title: res.status });
                    if (!res.success) toast({ title: res.status, variant: 'destructive' })
                })
                    .catch((err) => toast({ title: err.status, variant: 'destructive' }))
            })
        }
        else {
            startTransition(() => {
                addFavorite({ boardId: id, userId }).then((res) => {
                    setLocalIsFavorite(true)
                    if (res.success) toast({ title: res.status });
                    if (!res.success) toast({ title: res.status, variant: 'destructive' })
                })
                    .catch((err) => toast({ title: err.status, variant: 'destructive' }))
            })
        }




    }

    return (<Star onClick={() => handleToggleFavorite(localIsFavorite, boardId)} className={`w-5 cursor-pointer h-5 ${localIsFavorite ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />)
}

export default BoardFavorite
