import { ToggleMode } from '@/components/shared/toggle-mode'
import { Button } from '@/components/ui/button'
import { LogOutIcon, Settings } from 'lucide-react'
import React from 'react'

export const Navbar = () => {
    return (
        <header className='flex items-center justify-between bg-white dark:bg-dark-1  h-16 px-6 ' style={{boxShadow: "0 4px 2px -2px #3b82f6"}}>

            <div className=''>
                <p className='font-semibold text-sm md:text-lg'>Hi, Khalid...!</p>
                <p className='text-[10px] md:text-sm text-gray-600 tracking-wide'>Loggin to FireGrid</p>
            </div>

            <div className='flex items-center gap-x-2 '>
                <Button
                    variant={'icon'}
                    size={'icon'}
                    asChild
                >
                    <div>
                        <Settings className='w-6 h-6' />
                    </div>
                </Button>

                <Button
                    variant={'icon'}
                    size={'icon'}
                    asChild
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

