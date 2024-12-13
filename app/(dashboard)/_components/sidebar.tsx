'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CircleChevronLeft, CircleChevronRight, Star, UserRound, UserRoundPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import OrgainzationList from './orgainzation-list';

export const Sidebar = () => {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)

    // const { theme } = useTheme()
    const searchParams = useSearchParams()
    const type = searchParams.get('type')


    return (
        <aside className={cn('relative hidden md:block transition-all duration-300 h-screen', toggleSidebar ? 'w-[80px]' : 'w-[250px]')}>
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
                        <div className='flex flex-col justify-center items-center  gap-y-2 mt-3'>
                            <Button variant={type == null ? 'icon-active' : 'icon'} size={'icon'} asChild>
                                <Link href={{ pathname: '/dashboard' }}>
                                    <UserRound />
                                </Link>
                            </Button>
                            <Button  variant={type == 'team' ? 'icon-active' : 'icon'} size={'icon'} asChild>
                                <Link href={{ pathname: '/dashboard', query: { type: 'team' } }}>
                                    <UserRoundPlus />
                                </Link>
                            </Button>
                            {
                                type == 'team' && (
                                    <OrgainzationList show={false} />
                                )
                            }

                            <Button  variant={type == 'favorite' ? 'icon-active' : 'icon'} size={'icon'} asChild>
                                <Link href={{ pathname: '/dashboard', query: { type: 'favorite' } }}>
                                    <Star />
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className='sidebar  flex flex-col  gap-y-4 mt-3  '>
                            <div className='flex  flex-col py-1 cursor-pointer   w-full'>
                                <p className='text-lg px-5 mb-2'>Menu</p>
                                {/* Todo: Add gradient line refactor this */}
                                {/* {
                                    theme == 'light' ? <div className="h-[2px] bg-gradient-to-r from-white  via-blue-600 to-white  z-50" /> : <div className="h-[2px] bg-gradient-to-r from-dark-1 dark:to via-blue-600  to-dark-1 z-50" />
                                } */}
                            </div>

                            <Link href={'/dashboard'} className={cn('py-1 cursor-pointer   border-l-[6px]  w-full  rounded-md', type == null && 'border-blue-600 text-blue-600 ')}>
                                <div className='flex items-center gap-x-3 ml-4 '>
                                    <UserRound className='w-6 h-6' />
                                    <span className='text-lg '>Personnel</span>
                                </div>
                            </Link>

                            

                            <Link href={{ pathname: '/dashboard', query: { type: 'team' } }} className={cn('team-tab py-1 cursor-pointer   border-l-[6px]  w-full  rounded-md' , type == 'team' && 'border-blue-600 text-blue-600 '  )}>
                                <div className='flex items-center gap-x-2 ml-4'>
                                    <UserRoundPlus className='w-6 h-6' />
                                    <span className='text-lg '>Teammates</span>
                                </div>                              
                            </Link>
                            
                            {
                                type == 'team' && (
                                    <OrgainzationList show={true} />
                                )
                            }
                          

                            <Link  href={{ pathname: '/dashboard', query: { type: 'favorite' } }} className={cn(' fav-tab py-1 cursor-pointer   border-l-[6px]  w-full  rounded-md' , type == 'favorite' && 'border-blue-600 text-blue-600 '  )}>
                                <div className='flex items-center gap-x-2 ml-4'>
                                    <Star className='w-6 h-6' />
                                    <span className='text-lg '>Favorites</span>
                                </div>
                            </Link>
                        </div>
                    )
                }


            </div>

        </aside>
    )
}

