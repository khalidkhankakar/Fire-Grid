'use client'
import { memo } from "react";
import { useOther } from "@liveblocks/react/suspense";


interface CursorProps {
    connectionId: number
}

export const Cursor = memo(({ connectionId }: CursorProps) => {

    // const info = useOther(connectionId,(user)=>user.info)
    const cursor = useOther(connectionId, (user) => user.presence.cursor)

    // todo show the name of user
    // const name = info?.name || 'Teammate'

    if (!cursor) return null

    // Taking the co-ordinates
    const { x, y } = cursor;


    return (
        <svg
            style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
            className="relative"
            width="24"
            height="36"
            viewBox="0 0 24 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={'#FFC300'}
            />
        </svg>
    )
})

Cursor.displayName = 'Cursor'