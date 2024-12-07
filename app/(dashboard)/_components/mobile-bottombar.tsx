'use client';
import React from 'react'

import { Button } from '@/components/ui/button'
import { Home, Plus, Star, UserRound, UserRoundPlus } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const MobileBottombar = () => {

  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  return (
    <nav className='fixed bottom-0 rounded-tl-2xl rounded-tr-2xl flex items-center md:hidden left-0 right-0 border-2 bg-white dark:bg-dark-1 py-2 shadow-xl' style={{ boxShadow: "0 -4px 2px -2px #3b82f6" }}
    >
      <div className='flex gap-x-2 w-full justify-evenly items-center'>
        <Button variant={type == null ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard' }}>
            <Home />
          </Link>
        </Button>
        <Button variant={type == null ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard' }}>
            <UserRound />
          </Link>
        </Button>

        <Button
          variant={'icon'}

          className='h-12 w-12'
          asChild
        >
          <div>
            <Plus className='w-8 h-8' />
          </div>
        </Button>
        <Button variant={type == 'team' ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard', query: { type: 'team' } }}>
            <UserRoundPlus />
          </Link>
        </Button>
        <Button variant={type == 'favorite' ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard', query: { type: 'favorite' } }}>
            <Star />
          </Link>
        </Button>
      </div>
    </nav>
  )
}

export default MobileBottombar
