'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { OrganizationList } from '@clerk/nextjs';

const OrgSwticherModel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-transparent border-none p-0 m-0 shadow-none flex items-center justify-center">
                <DialogHeader>
                    <DialogTitle className="text-xl font-normal hidden">Create Board</DialogTitle>
                </DialogHeader>
                {/* todo: Bug here it redirects to landing page */}
                <OrganizationList />
            </DialogContent>
        </Dialog>
    )
}

export default OrgSwticherModel
