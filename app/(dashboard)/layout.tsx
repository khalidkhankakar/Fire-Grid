import React from 'react'

import { Navbar } from '@/components/shared/navbar'
import { Sidebar } from './_components/sidebar'
import MobileBottombar from './_components/mobile-bottombar'
import FiregridChatbot from '@/components/shared/firegrid-chatbot'


interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Readonly<DashboardLayoutProps>) => {
    return (
        <main className='h-full w-full bg-white dark:bg-dark-1'>
            <div className='flex'>
                <Sidebar />
                <div className='flex-1 flex flex-col '>
                    <Navbar isShowLogo={false} />
                    <main className='shadow-xl w-full  shadow-[#6b63631a]'>
                        {children}
                    </main>
                    <FiregridChatbot />
                <MobileBottombar />
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout
