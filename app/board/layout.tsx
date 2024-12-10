import React from 'react'
import { Navbar } from '../(dashboard)/_components/navbar'
import { BoardSidebar } from './_components/board-sidebar'

interface BoardLayoutProps {
    children: React.ReactNode
}

const BoardLayout = ({children} : Readonly<BoardLayoutProps>) => {
    return (
        <section className='flex flex-col h-screen bg-white dark:bg-dark-1'>

            <Navbar isShowLogo={true} />
            <div className='flex'>
                <BoardSidebar />
                <main className='flex-1 '>
                {children}
                </main>
            </div>
        </section>
    )
}

export default BoardLayout
