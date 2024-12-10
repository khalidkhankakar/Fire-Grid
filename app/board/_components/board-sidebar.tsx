'use client';
import React from 'react'
import { useClerk } from '@clerk/nextjs';

export const BoardSidebar = () => {
    // TODO: make api call to get user workspace details
    const { user } = useClerk();
    return (
        <aside className={'relative hidden md:block transition-all duration-300 h-[calc(100vh-64px)] shadow-xl shadow-gray-400 dark:shadow-slate-900 bg-white dark:bg-dark-1 w-[200px] '}>
            <div className='h-full w-full'>
                <div className='relative flex items-center pl-4 h-16 ' style={{ boxShadow: "0 4px 2px -2px #3b82f6" }}>
                    <div>
                        <p className=' text-sm md:text-lg'>{user?.firstName} Workspace </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

