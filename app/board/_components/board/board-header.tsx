'use client';


interface BoardHeaderProps {
    title: string
}

const BoardHeader = ({
    title
}: BoardHeaderProps) => {
  return (
      <header className="py-3 px-4 text-white  bg-slate-900/15  w-full flex-wrap flex items-center">
        <h1 className="text-sm font-bold">{title}</h1>
      </header>
  )
}

export default BoardHeader
