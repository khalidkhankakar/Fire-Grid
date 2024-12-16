import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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
            <ToggleMode />
        </nav>
    </header>
  )
}

export default LandingNavbar
