'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CircleChevronLeft, CircleChevronRight, Star, UserRound, UserRoundPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from './mobile-sidebar';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export const Sidebar = () => {
    const { theme } = useTheme()

    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
    return (
        <aside className={cn('relative transition-all duration-300 h-screen border-red-500', toggleSidebar ? 'w-[80px]' : 'w-[250px]')}>
            <div className='h-full w-full'>
                <div className='relative flex items-center pl-4 h-16 ' style={{ boxShadow: "0 4px 2px -2px #3b82f6" }}>
                    <Link href="/" className={cn('', toggleSidebar ? 'hidden' : 'block')}>
                        <Image
                            src="/logo.svg"
                            alt="FireGrid"
                            width={180}
                            height={30}
                            className='object-contain '
                        />
                    </Link>
                    <Button
                        size={'icon'}
                        variant='icon'
                        className={cn('absolute cursor-pointer  ', toggleSidebar ? 'right-[50%] translate-x-[50%]' : 'translate-x-0 translate-y-[-50%] right-0 top-[50%]')}
                        onClick={() => setToggleSidebar((prev) => !prev)}

                        asChild
                    >
                        <div>
                            {
                                !toggleSidebar ? <CircleChevronLeft className='w-12 h-12' /> : <CircleChevronRight className='w-12 h-12' />
                            }
                        </div>
                    </Button>
                </div>

                {
                    toggleSidebar ? (
                        <MobileSidebar />
                    ) : (
                        <div className='flex flex-col items-center gap-y-4 mt-3  '>
                            <div className='flex   flex-col py-1 cursor-pointer justify-center  w-full'>
                                <p className='text-lg px-5 mb-2'>Menu</p>
                                {
                                    theme === 'light' ?
                                        <div className="h-[2px] bg-gradient-to-r from-white  via-blue-600 to-white  z-50" /> :
                                        <div className="h-[2px] bg-gradient-to-r from-dark-1 dark:to via-blue-600  to-dark-1 z-50" />
                                }
                            </div>

                            <div className='flex items-center  py-1 cursor-pointer justify-center gap-x-2 border-l-[6px] border-blue-600 w-full text-blue-600 rounded-md '>
                                <UserRound className='w-7 h-7' />
                                <span className='text-lg '>Personnel</span>
                            </div>

                            <div className='flex items-center  py-1 cursor-pointer justify-center gap-x-2 border-l-4  w-full'>
                                <UserRoundPlus className='w-7 h-7' />
                                <span className='text-lg '>Teammates</span>
                            </div>

                            <div className='flex items-center  py-1 cursor-pointer justify-center gap-x-2 border-l-4  w-full'>
                                <Star className='w-7 h-7' />
                                <span className='text-lg '>Favorites</span>
                            </div>




                        </div>
                    )
                }


            </div>

        </aside>
    )
}

