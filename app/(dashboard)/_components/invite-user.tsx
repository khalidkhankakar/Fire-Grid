'use client';

import { OrganizationProfile, useOrganization } from '@clerk/nextjs';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const InviteUser = ({ children }: { children: React.ReactNode }) => {
    const { organization } = useOrganization();
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className=" flex items-center justify-center gap-0 shadow-none ">
                <DialogHeader>
                    <DialogTitle className="text-xl font-normal hidden">Invite User</DialogTitle>
                </DialogHeader>
                {/* todo: Bug here it redirects to landing page */}
                {organization ?
                 <OrganizationProfile routing='virtual' /> :
                    <p className='text-lg text-center text-yellow-500 '>Please create an organization first or Select oganization</p>
                }
            </DialogContent>
        </Dialog>
    )
}

export default InviteUser
