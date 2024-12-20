'use client'
import { memo } from "react";
import { useOther } from "@liveblocks/react/suspense";

import { getCursorColor } from "@/lib/utils";


interface CursorProps {
    connectionId: number
}

export const Cursor = memo(({ connectionId }: CursorProps) => {

    const info = useOther(connectionId, (user) => user.info)
    const cursor = useOther(connectionId, (user) => user.presence.cursor)


    const name = info?.name || 'Teammate'

    if (!cursor) return null

    const { x, y } = cursor;


    return (
        <div
            style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
            className="relative"
        >
            <svg
                width="36"
                height="45"
                viewBox="0 0 24 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                    fill={getCursorColor(connectionId)}
                />
            </svg>
            <div className="absolute left-3 px-1.5 py-0.5 text-white rounded-md"
                style={{ background: getCursorColor(connectionId) }}
            >
                {name}
            </div>
        </div>
    )
})

Cursor.displayName = 'Cursor'