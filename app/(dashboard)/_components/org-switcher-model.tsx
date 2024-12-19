'use client';
import { OrganizationList } from '@clerk/nextjs';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';


const OrgSwticherModel = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-transparent border-none p-0 m-0 shadow-none flex items-center justify-center">
                <DialogHeader>
                    <DialogTitle className="text-xl font-normal hidden">Create Board</DialogTitle>
                </DialogHeader>
            
                <OrganizationList
                appearance={{baseTheme: theme === 'dark' ? dark : undefined}}
                />
            </DialogContent>
        </Dialog>
    )
}

export default OrgSwticherModel
