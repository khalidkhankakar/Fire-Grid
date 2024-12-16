'use server';
import { SearchParams } from "@/app/(dashboard)/dashboard/page";
import { BOARDS_PER_PAGE } from "@/contants";
import { db } from "@/lib/db/drizzle";
import { board } from "@/lib/db/schemas";
import { and, asc, count, desc, eq } from "drizzle-orm";
import { categoryFilter, datetimeFilter, searchFilter } from "./filter.query";
import { auth } from "@clerk/nextjs/server";



// export const getBoards = async (searchParams: SearchParams) => {
//     const page = Math.max(1, Number(searchParams.page) || 1);
//     const filters = [
//         searchFilter(searchParams?.search),
//         categoryFilter(searchParams?.category),
//         datetimeFilter(searchParams?.datetime),
//     ];
//     const orderDirection = searchParams?.order === 'asc' ? asc(board.createdAt) : desc(board.createdAt);
//     const whereClause = filters.length > 0 ? and(...filters) : undefined;
//     const offset = (page - 1) * BOARDS_PER_PAGE;

//     const { orgId, userId } = await auth();



//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     let results:any[] = [];

//     if (!searchParams?.type) {
//         results = await db.query.board.findMany({
//             where: and(
//                 whereClause,
//                 eq(board.visibility, 'personal')
//             ),
//             orderBy: orderDirection,
//             limit: BOARDS_PER_PAGE,
//             offset,
//             with: {
//                 boardFavorites: true,
//             }
//         })
//     }

//     if (searchParams?.type === 'team') {
//         if(!orgId) return [];
//         results = await db.query.board.findMany({
//             where: and(
//                 whereClause,
//                 eq(board.visibility, 'team'),
//                 eq(board.orgId, orgId as string)
//             ),
//             orderBy: orderDirection,
//             limit: BOARDS_PER_PAGE,
//             offset,
//             with: {
//                 boardFavorites: true,
//             }
//         })
//     }


//     if (searchParams?.type === 'favorite') {
//         results = await db.query.board.findMany({
//             where:whereClause,
//             orderBy: orderDirection,
//             limit: BOARDS_PER_PAGE,
//             offset,
//             with: {
//                 boardFavorites: true
//             }
//         })
//         return results.filter(board => board.boardFavorites.some((favorite: { userId: string | null; }) => favorite.userId === userId)).map((board)=>({
//             ...board,
//             isFavorite: true,

//         })); 
//     }

//     return results.map((board) => {
//         const isFavorite = board.boardFavorites.some((favorite: { userId: string | null; }) => favorite.userId === userId)
//         return {
//             ...board,
//             isFavorite,

//         }
//     })
// }


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

    // Get total result count
    let totalResult = 0;

    if (!searchParams?.type) {
        const res = await db.select({ count: count() }).from(board).where(
            and(
                whereClause,
                eq(board.visibility, 'personal')
            )
        )
        totalResult = res[0]?.count || 0
    }

    if (searchParams?.type === 'team') {
        if (!orgId) return { totalResult: 0, totalPages: 0, boards: [] };

        const res = await db.select({ count: count() }).from(board).where(
            and(
                whereClause,
                eq(board.visibility, 'team'),
                eq(board.orgId, orgId as string)
            )
        )

        totalResult = res[0]?.count || 0
    }

    if (searchParams?.type === 'favorite') {
        const res = await db.select({ count: count() }).from(board).where(whereClause);
        totalResult = res[0]?.count || 0;
    }

    // Get boards based on the filters

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let results: any[] = [];

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
                boardFavorites: true,
            }
        });
    }

    if (searchParams?.type === 'team') {
        if (!orgId) return { totalResult: 0, totalPages: 0, boards: [] };

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
                boardFavorites: true,
            }
        });
    }

    if (searchParams?.type === 'favorite') {
        results = await db.query.board.findMany({
            where: whereClause,
            orderBy: orderDirection,
            limit: BOARDS_PER_PAGE,
            offset,
            with: {
                boardFavorites: true,
            }
        });

        results = results.filter(board =>
            board.boardFavorites.some((favorite: { userId: string | null }) => favorite.userId === userId)
        );
    }

    // Calculate totalPages
    const totalPages = Math.ceil(totalResult / BOARDS_PER_PAGE);

    // Map results to include 'isFavorite' property
    const boards = results.map((board) => {
        const isFavorite = board.boardFavorites.some((favorite: { userId: string | null }) => favorite.userId === userId);
        return {
            ...board,
            isFavorite,
        };
    });

    return {
        totalResult,
        totalPages,
        boards,
    };
};
