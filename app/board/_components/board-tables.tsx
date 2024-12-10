import React from 'react'
import CreateTable from './create-table'
import TableCard from './table-card';


type table = {
    id: string;
    title: string;
    backgroundColor: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    position: number;
    boardId: string;
}


interface BoardTablesProps {
    id: string,
    title: string,
    visibility: string,
    image: string,
    category: string
    boardTables: table[]
}

const BoardTables = ({
    id,
    title,
    visibility,
    image,
    category,
    boardTables
}: BoardTablesProps) => {
    return (
        <div
            style={{
                backgroundImage: 'url(' + image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}
            className='w-[100vw] md:w-[calc(100vw-200px)]  overflow-x-auto overscroll-y-none  h-[calc(100vh-64px)] flex items-center flex-col'>

            <header className='py-3 px-4 bg-slate-900/15 w-full flex-wrap flex items-center'>
                <h1 className='text-sm font-bold'>{title}</h1>
            </header>

            <div className='w-full gap-3 flex h-[calc(100vh-64px)] p-4 overflow-x-auto' >

                {/* TODO: add cards */}
                {boardTables?.map((table) => (
                    <TableCard key={table.id} id={table.id} title={table.title} backgroundColor={table.backgroundColor} boardId={table.boardId} position={table.position} />
                ))}

                <CreateTable boardId={id} tableCount={boardTables.length} />
            </div>
        </div>
    )
}

export default BoardTables
