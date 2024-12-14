'use client';
import { useOthersConnectionIds } from '@liveblocks/react'
import React, { memo } from 'react'
import { Cursor } from './cursor';


const Cursors = () => {
    const ids = useOthersConnectionIds()
    return (
        <>
        {
            ids.map((id) => <Cursor key={id} connectionId={id} />)
        }
        </>
    )
}


export const CursorPresence = memo(() => {
    return (
        <>
        <Cursors />
        </>
    )
})

CursorPresence.displayName = 'CursorPresence'