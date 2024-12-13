'use client';
import { Button } from '@/components/ui/button';
import {  useOrganizationList } from '@clerk/nextjs';
import React from 'react'
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
