'use client';

import { useOthers, useSelf } from "@liveblocks/react/suspense";

import User from "./user";

import { getCursorColor } from "@/lib/utils";


interface BoardHeaderProps {
  title: string
}

const BoardHeader = ({
  title
}: BoardHeaderProps) => {
  const others = useOthers()
  const self = useSelf()
  return (
    <header className="py-3 px-4 text-white  bg-slate-900/15  w-full flex-wrap flex items-center justify-between">
      <h1 className="text-sm font-bold">{title}</h1>

      <div className="flex items-center gap-x-2">
        {/* online user in same room */}

        {
          others?.map(({ connectionId, info }) => (
            <User key={connectionId} borderColor={getCursorColor(connectionId)} src={info.picture} name={info.name} />
          ))
        }
        {

          <User borderColor={getCursorColor(self.connectionId)} src={self.info.picture} name={self.info.name} />
        }
      </div>
    </header>
  )
}

export default BoardHeader
