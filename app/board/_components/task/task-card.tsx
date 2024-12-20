'use client'
import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { NotebookText, Pencil } from 'lucide-react'

import { TaskCardModel } from './task-card-model'

import { LabelType } from '@/lib/db/schemas/card.schema'
import Tip from '@/components/shared/tip'

interface TaskCardProps {
  boardId: string
  cardId: string
  title: string
  backgroundColor: string
  backgroundImage: string
  description: string
  label: LabelType
  position: number // todo use later
  deadline: string
}

const TaskCard = ({ title,boardId, cardId, backgroundColor, backgroundImage, label, description, deadline }: TaskCardProps) => {
  return (
    <div 

    style={{ backgroundColor }} 
    className='h-full hover:shadow-lg hover:scale-[1.05] transition-all rounded-lg w-full flex flex-col gap-y-1 p-2'>

      {backgroundImage && <Image src={backgroundImage} width={100} height={100} alt={'coverimg'} className='rounded-lg w-full h-16 object-cover' />}

      <div className='flex items-center justify-between'>
        <p className='text-sm'>{title}</p>
        <TaskCardModel
          boardId={boardId}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          label={label}
          description={description}
          deadline={deadline}
          title={title}
          cardId={cardId}
        >
          <Button variant={'icon-normal'} size={'icon'}>
              <Pencil />
          </Button>
        </TaskCardModel>
      </div>
      <div className='flex items-center gap-1'>
        {
          label?.data?.map((lab) => (
            <Tip label={`Label: ${lab.title}`} align='center' side='bottom' key={lab.title}>
            <div style={{ backgroundColor: lab.color }} className='h-3 rounded-lg  w-1/4' />
            </Tip>
          ))
        }
      </div>

      <div className='flex items-center gap-1'>
        {description && <Tip label={'It has description'} align='center' side='bottom' ><NotebookText /></Tip>}
        {deadline && <Tip label={'Deadline'} align='center' side='bottom' ><div className='text-xs p-1 rounded-md shadow-md bg-blue-400 text-white'>{deadline}</div></Tip>}
      </div>

    </div>
  )
}

export default TaskCard
