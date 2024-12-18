import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { ToggleMode } from './toggle-mode'

const LandingNavbar = () => {
  return (
    <header className='z-50'>
      <nav className='flex py-4 px-5 justify-between '>
        <Link href={'/'} className='logo'>
          <Image
            src={'/logo.svg'}
            width={200}
            height={200}
            className='object-contain cursor-pointer'
            alt='logo'
          />
        </Link>
        <div className='flex items-center gap-x-3 '>
          <Button variant={'link'} asChild>
            <Link href={'/dashboard'}>Dashboard</Link>
          </Button>
          <ToggleMode />
        </div>
      </nav>
    </header>
  )
}

export default LandingNavbar
