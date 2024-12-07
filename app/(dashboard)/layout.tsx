import React from 'react'
import { Sidebar } from './_components/sidebar'
import { Navbar } from './_components/navbar'
import MobileBottombar from './_components/mobile-bottombar'

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
                    <main className='shadow-xl shadow-[#6b63631a]'>
                        {children}
                    </main>
                </div>
                <MobileBottombar />
            </div>

        </main>
    )
}

export default DashboardLayout
