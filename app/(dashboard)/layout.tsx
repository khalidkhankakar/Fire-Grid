import React from 'react'
import { Sidebar } from './_components/sidebar'
import { Navbar } from './_components/navbar'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Readonly<DashboardLayoutProps>) => {
    return (
        <main className='h-full w-full bg-white dark:bg-dark-1'>
            <div className='flex'>
                <Sidebar />
                <div className='flex-1 flex flex-col '>
                    <Navbar />
                    <main className=' min-h-[calc(100vh-64px)] shadow-xl shadow-[#6b63631a]'>
                        {children}
                    </main>
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout
