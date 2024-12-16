'use client'
import { Button } from '@/components/ui/button'
import { NotebookText, Pencil } from 'lucide-react'
import React from 'react'
import { TaskCardModel } from './task-card-model'
import { LabelType } from '@/lib/db/schemas/card.schema'
import Image from 'next/image'

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
    className='h-full rounded-lg w-full flex flex-col gap-y-1 p-2'>

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
            <div style={{ backgroundColor: lab.color }} key={lab.title} className='h-3 rounded-lg  w-1/4' />
          ))
        }
      </div>

      <div className='flex items-center gap-1'>
        {description && <NotebookText />}
        {deadline && <div className='text-xs p-1 rounded-md shadow-md bg-blue-400 text-white'>{deadline}</div>}
      </div>

    </div>
  )
}

export default TaskCard
