import React from 'react'
import Image from 'next/image'

interface NoResultProps {
    imgSrc: string
    title: string
    description: string
    children?: React.ReactNode
}

const NoResult = ({
    imgSrc,
    title,
    description,
    children
}: NoResultProps) => {
    return (
        <div className='h-full w-full flex flex-col gap-y-3 items-center justify-center'>
            <Image
                src={imgSrc}
                width={200}
                height={200}
                alt='no result'
            />
            <p className='text-xl text-center font-semibold'>{title}</p>
            <p className='text-sm text-center text-muted-foreground'>{description}</p>
            <div>
                {children}
            </div>

        </div>
    )
}

export default NoResult
