'use client';

import { OrganizationSwitcher } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';


const OrgSwitcher = () => {
    const { theme } = useTheme();
    return (
        <OrganizationSwitcher
            appearance={{
                baseTheme: theme === 'dark' ? dark : undefined,
                variables: {
                    fontSize: '16px',
                },
                elements: {
                    organizationSwitcherTrigger: {
                        padding: '4px 6px',
                        backgroundColor: theme === 'dark' ? '#808080' : '#d9d9d9'
                    }
                }
            }}
        />
    )
}

export default OrgSwitcher
