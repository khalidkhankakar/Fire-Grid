'use client';
import { Ellipsis } from 'lucide-react';
import React from 'react';
import CreateCardButton from '../task/create-card-button';
import TaskCard from '../task/task-card';
import { Button } from '@/components/ui/button';
import { TableModel } from './table-model';
import { Draggable, DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { CardType } from '@/lib/db/schemas/card.schema';

interface TableCardProps {
  tableCards: CardType[];
  provided: DraggableProvided;
  id: string;
  title: string;
  backgroundColor: string | null;
  boardId: string;
  position: number;
  index: number;
}

const TableCard = ({ tableCards,provided: tableProvided, id, title, backgroundColor }: TableCardProps) => {
  return (
    <Droppable droppableId={id} type="CARD">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="h-fit max-h-2/3 w-64 rounded-lg overflow-y-auto flex-shrink-0 p-2"
          style={{ backgroundColor: backgroundColor || '#000' }}
        >
          <div {...tableProvided.dragHandleProps} className="flex items-center justify-between">
            <p className="text-sm">{title}</p>
            <div className="flex items-center space-x-2">
              <TableModel title={title} tableId={id} backgroundColor={backgroundColor || '#000'}>
                <Button variant={'icon-normal'}>
                  <Ellipsis />
                </Button>
              </TableModel>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 my-2">
            {tableCards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      key={card.id}
                      cardId={card.id}
                      title={card.title}
                      backgroundColor={card?.backgroundColor || '#9ca3af'}
                      backgroundImage={card?.backgroundImage || ''}
                      description={card?.description || ''}
                      label={card?.label || { data: [] }}
                      position={card?.position || 0}
                      deadline={card?.taskDeadline || ''}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          <div>
            <CreateCardButton tableId={id} cardCount={tableCards.length || 0} />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TableCard;
