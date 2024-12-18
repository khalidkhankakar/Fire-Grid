'use client';
import {  useOrganizationList } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

import { CreateBoardButton } from './create-board-button';
import CreateOrg from './create-org';

const OrgBoardButton = () => {

    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    if (userMemberships.data?.length === 0) {
        return (<CreateOrg >
             <Button>Create Orgainzation</Button>
             </CreateOrg>)
    }
    return (<CreateBoardButton >
        <Button className='create-board'>Create Board</Button>
    </CreateBoardButton>)
}


export default OrgBoardButton
