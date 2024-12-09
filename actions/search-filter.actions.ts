'use server';
import { SearchParams } from "@/app/(dashboard)/dashboard/page";
import { BOARDS_PER_PAGE } from "@/contants";
import { db } from "@/lib/db/drizzle";
import { board } from "@/lib/db/schemas";
import { and, asc, desc, eq } from "drizzle-orm";
import { categoryFilter, datetimeFilter, searchFilter } from "./filter.query";
import { auth } from "@clerk/nextjs/server";



export const getBoards = async (searchParams: SearchParams) => {
    const page = Math.max(1, Number(searchParams.page) || 1);
    const filters = [
        searchFilter(searchParams?.search),
        categoryFilter(searchParams?.category),
        datetimeFilter(searchParams?.datetime),
    ];
    const orderDirection = searchParams?.order === 'asc' ? asc(board.createdAt) : desc(board.createdAt);
    const whereClause = filters.length > 0 ? and(...filters) : undefined;
    const offset = (page - 1) * BOARDS_PER_PAGE;

    const { orgId, userId } = await auth();



    let results = [];

    if (!searchParams?.type) {
        results = await db.query.board.findMany({
            where: and(
                whereClause,
                eq(board.visibility, 'personal')
            ),
            orderBy: orderDirection,
            limit: BOARDS_PER_PAGE,
            offset,
            with: {
                boardFavorites: true
            }
        })
    }

    if (searchParams?.type === 'team') {
        if(!orgId) return [];
        results = await db.query.board.findMany({
            where: and(
                whereClause,
                eq(board.visibility, 'team'),
                eq(board.orgId, orgId as string)
            ),
            orderBy: orderDirection,
            limit: BOARDS_PER_PAGE,
            offset,
            with: {
                boardFavorites: true
            }
        })
    }


    if (searchParams?.type === 'favorite') {
        results = await db.query.board.findMany({
            where:whereClause,
            orderBy: orderDirection,
            limit: BOARDS_PER_PAGE,
            offset,
            with: {
                boardFavorites: true
            }
        })
        return results.filter(board => board.boardFavorites.some(favorite => favorite.userId === userId)).map((board)=>({
            ...board,
            isFavorite: true
        })); 
    }

    return results.map((board) => {
        const isFavorite = board.boardFavorites.some((favorite) => favorite.userId === userId)
        return {
            ...board,
            isFavorite
        }
    })
}
