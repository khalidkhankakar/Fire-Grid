'use client';
import { ToggleMode } from '@/components/shared/toggle-mode'
import { Button } from '@/components/ui/button'
import { useClerk, UserButton } from '@clerk/nextjs';
import { LogOutIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link'
import { dark } from '@clerk/themes'

import React from 'react'

interface NavbarProps {
    isShowLogo: boolean
}

export const Navbar = ({ isShowLogo }: Readonly<NavbarProps>) => {
    const { theme } = useTheme();
    const { signOut } = useClerk();
    const { user } = useClerk();
    return (
        <header className='navbar flex items-center justify-between bg-white dark:bg-dark-1 z-50 h-16  px-6 ' style={{ boxShadow: "0 4px 2px -2px #3b82f6" }}>
            {isShowLogo ? (<Link href="/" >
                <Image
                    src="/logo.svg"
                    alt="FireGrid"
                    width={180}
                    height={30}
                    className='object-contain  '
                />
            </Link>) : (<div >
                <Link href="/" >
                    <Image
                        src="/logo.svg"
                        alt="FireGrid"
                        width={180}
                        height={30}
                        className='object-contain block md:hidden '
                    />
                </Link>
                <div className='hidden md:block'>
                    <p className='font-semibold text-sm md:text-lg'>Hi, {user?.firstName} {'...!'} </p>
                    <p className='text-[10px] md:text-sm text-gray-600 tracking-wide'>Loggin to FireGrid</p>
                </div>
            </div>)}

            <div className='flex items-center gap-x-2 '>
                <Button
                    variant={'icon'}
                    size={'icon'}

                    asChild
                >
                    <div>
                        <UserButton
                            appearance={{
                                baseTheme: theme === 'dark' ? dark : undefined,
                            }}
                        />
                    </div>
                </Button>

                <Button
                    variant={'icon'}
                    size={'icon'}
                    asChild
                    onClick={() => signOut({ redirectUrl: '/sign-in' })}
                >
                    <div>
                        <LogOutIcon className='w-6 h-6' />
                    </div>
                </Button>
                <ToggleMode />
            </div>

        </header>
    )
}

