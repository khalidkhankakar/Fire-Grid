'use client';

import Image from 'next/image';
import {  useOrganization, useOrganizationList } from '@clerk/nextjs'

import Tip from '@/components/shared/tip';

import { cn } from '@/lib/utils';

const OrgainzationList = ({show}: {show: boolean}) => {
  const {setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });
  const { organization } = useOrganization();

  if (!userMemberships || !userMemberships.data?.length) return null

  const handleSelectOrg = (orgId: string) => { 
    if(!setActive) return
    setActive({organization: orgId})
  }


  return (
    <div className={show ? 'ml-9' : ' '}>
      <div className='flex flex-col gap-y-2'>

        {
          userMemberships?.data?.map((org) => (
            <Tip key={org.id} label={org.organization.name} side='right' align='center'>
            <div onClick={() => handleSelectOrg(org.organization.id)} className={cn(`flex items-center space-x-2 w-full px-3 py-1 text-sm hover:bg-blue-500/10  rounded-md cursor-pointer`, org.organization.id === organization?.id && 'bg-blue-500/10') } >
              <Image src={org.organization.imageUrl} width={100} height={100} alt={'orgimage'} className='rounded-lg w-7 h-7 object-cover' />
              {show &&<p className='text-sm'>{org.organization.name}</p>}
            </div>
            </Tip>
          ))
        }
      </div>
    </div>
  )
}

export default OrgainzationList
