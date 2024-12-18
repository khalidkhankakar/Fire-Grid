'use client';
import React from 'react'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';

import { Button } from '@/components/ui/button'
import { Earth, Plus, Star, UserRound, UserRoundPlus } from 'lucide-react'

import OrgSwticherModel from './org-switcher-model';
import { CreateBoardButton } from './create-board-button';


const MobileBottombar = () => {

  const { organization } = useOrganization()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  return (
    <nav className='fixed bottom-0 rounded-tl-2xl rounded-tr-2xl flex items-center md:hidden left-0 right-0 border-2 bg-white dark:bg-dark-1 py-2 shadow-xl' style={{ boxShadow: "0 -4px 2px -2px #3b82f6" }}
    >
      <div className='flex gap-x-2 w-full justify-evenly items-center'>
        <Button variant={type == null ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard' }}>
            <UserRound />
          </Link>
        </Button>
        <Button variant={type == 'team' ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard', query: { type: 'team' } }}>
            <UserRoundPlus />
          </Link>
        </Button>

        <CreateBoardButton>
          <Button
            variant={'icon'}
            className='h-12 w-12'
            asChild
          >
            <div>
              <Plus className='w-8 h-8' />
            </div>
          </Button>
        </CreateBoardButton>

        <Button variant={type == 'favorite' ? 'icon-active' : 'icon'} size={'icon'} asChild>
          <Link href={{ pathname: '/dashboard', query: { type: 'favorite' } }}>
            <Star />
          </Link>
        </Button>



        <OrgSwticherModel>
          {
            organization ?
              <div>
                <Image src={organization.imageUrl} width={100} height={100} alt={'orgimage'} className='rounded-lg w-9 h-9 object-cover' />
              </div>
              :
              <Button variant={'icon'} size={'icon'}>
                <Earth />
              </Button>
          }
        </OrgSwticherModel>

      </div>
    </nav>
  )
}

export default MobileBottombar
