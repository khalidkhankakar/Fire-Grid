import React from 'react'

import { Sidebar } from './_components/sidebar'
import { Navbar } from '@/components/shared/navbar'
import MobileBottombar from './_components/mobile-bottombar'
import DashboardTour from '@/components/shared/dashboard-tour'


interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Readonly<DashboardLayoutProps>) => {
    return (
        <main className='h-full w-full bg-white dark:bg-dark-1'>
            <DashboardTour />
            <div className='flex'>
                <Sidebar />
                <div className='flex-1 flex flex-col '>
                    <Navbar isShowLogo={false} />
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
