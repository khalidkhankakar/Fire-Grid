import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateOrganization } from '@clerk/nextjs';

const CreateOrg = ({children}: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
               {children}
            </DialogTrigger>
            <DialogContent className="bg-transparent border-none p-0 m-0 shadow-none">
                <DialogHeader>
                    <DialogTitle className="text-xl font-normal hidden">Create Board</DialogTitle>
                </DialogHeader>
                {/* todo: Bug here it redirects to landing page */}
                <CreateOrganization hideSlug />
            </DialogContent>
        </Dialog>
    )
}

export default CreateOrg
