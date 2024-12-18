'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link'
import { OrganizationSwitcher, useClerk, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes'

import { ToggleMode } from '@/components/shared/toggle-mode'
import { Button } from '@/components/ui/button'
import { LogOutIcon, Plus } from 'lucide-react';

import InviteUser from '@/app/(dashboard)/_components/invite-user';
import Tip from './tip';


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
                    <p className='text-[10px] md:text-sm text-gray-600 tracking-wide'>Logged into FireGrid</p>
                </div>
            </div>)}

            <div className='flex items-center gap-x-2 '>
            <Tip label={'Change organization'} side='bottom' align='center'>

                <div className='hidden md:block'>
                <OrganizationSwitcher
                appearance={{
                    baseTheme: theme === 'dark' ? dark : undefined,
                    variables: {
                        fontSize: '16px',
                    },
                    elements: {
                        organizationSwitcherTrigger: {
                            padding: '8px',
                            backgroundColor: theme === 'dark' ? '#828282' : '#d4d4d4'
                        }
                    }
                }}
                />
                </div>
                </Tip>
                <Tip label={'Profile'} side='bottom' align='center'>

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
                </Tip>

                <InviteUser>
                <Tip label={'Invite user'} side='bottom' align='center'>
                    <Button size={'icon'} variant={'icon-active'}  >
                        <Plus className='w-6 h-6' />
                    </Button>
                </Tip>
                </InviteUser>
                <Tip label={'Logout'} side='bottom' align='center'>
                <Button
                    variant={'icon'}
                    size={'icon'}
                    className='cursor-pointer'
                    asChild
                    onClick={() => signOut({ redirectUrl: '/sign-in' })}
                >
                    <div>
                        <LogOutIcon className='w-6 h-6' />
                    </div>
                </Button>
                </Tip>

                <ToggleMode />
            </div>

        </header>
    )
}

