import { Button } from '@/components/ui/button'
import { Star, UserRound, UserRoundPlus } from 'lucide-react'
import React from 'react'

const MobileSidebar = () => {
  return (
    <div className='flex flex-col items-center gap-y-2 mt-3'>
        <Button variant={'icon-active'} size={'icon'} asChild>
            <div>
                <UserRound />
            </div>
        </Button>
        <Button variant={'icon'} size={'icon'} asChild>
            <div>
                <UserRoundPlus />
            </div>
        </Button>
        <Button variant={'icon'} size={'icon'} asChild>
            <div>
                <Star  />
            </div>
        </Button>
    </div>
  )
}

export default MobileSidebar
