'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import qs from 'query-string'

interface PaginationProps {
    totalPages: number
    currentPage: number
}

const Pagination = ({
    totalPages,
    currentPage
}: PaginationProps) => {
    const [page, setPage] = useState(currentPage);
    const router = useRouter()

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                page
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }, [router, page])

    if (totalPages <= 0) return null
    return (
        <div className="flex space-x-1 pb-12 md:pb-6 mx-auto justify-center items-center ">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Prev
            </button>

            {
                Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        onClick={() => setPage(index + 1)}
                    >{index + 1}</button>
                ))
            }

            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Next
            </button>
        </div>
    )
}

export default Pagination
