import React from 'react'

interface TaskCardProps {
    title: string
    backgroundColor:string
}

const TaskCard = ({title, backgroundColor}: TaskCardProps) => {
  return (
    <div style={{ backgroundColor }} className='h-full rounded-lg w-full flex flex-col gap-y-1 py-2 px-2 bg-gray-400'>
        <p className='text-sm'>{title}</p>
    </div>
  )
}

export default TaskCard
