import Image from 'next/image'
import React from 'react'

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
            <p className='text-xl font-semibold'>{title}</p>
            <p className='text-sm text-muted-foreground'>{description}</p>
            <div>
                {children}
            </div>

        </div>
    )
}

export default NoResult
