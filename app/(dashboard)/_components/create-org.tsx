import { CreateOrganization } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

const CreateOrg = ({children}: { children: React.ReactNode }) => {
    const {theme} = useTheme();
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
                <CreateOrganization 
                
                appearance={{baseTheme: theme === 'dark' ? dark : undefined}}
                 hideSlug />
            </DialogContent>
        </Dialog>
    )
}

export default CreateOrg
