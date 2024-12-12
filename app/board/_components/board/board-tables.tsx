'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import CreateTable from '../table/create-table';
import TableCard from '../table/table-card';
import { Table } from '@/types';

interface BoardTablesProps {
  id: string;
  title: string;
  image: string;
  boardTables: Table[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;

}

const BoardTables = ({ id, title, image, boardTables: initialTables }: BoardTablesProps) => {
  const [boardTables, setBoardTables] = useState(initialTables);

  const handleDragEnd = (result: any ) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // if dropped in same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    if (type === 'TABLE') {
      const items = reorder(
        boardTables,
        source.index,
        destination.index).map((table, index) => ({ ...table, position: index }))
        setBoardTables(items)
        // Todo api call
        
    }

    if (type === 'CARD') {
      console.log(source?.droppableId, destination?.droppableId)
      const newOrder = [...boardTables];
      const sourceList = newOrder.find((table) => table.id === source.droppableId);
      const destList = newOrder.find((table) => table.id === destination.droppableId);


      console.log({sourceList, destList})

      if (!sourceList || !destList) return; 

      if(!sourceList.tableCards) {
        sourceList.tableCards = []
      };

      if(!destList.tableCards) {
        destList.tableCards = []
      };

      // moving card in same list
      if (sourceList.id === destList.id) {
        const items = reorder(
          sourceList.tableCards,
          source.index,
          destination.index
        ).map((card, index) => ({ ...card, position: index }));

        sourceList.tableCards = items;
        setBoardTables(newOrder);
        // todo make api call
      }
      // moving card to another list
      else {
        const [removed] = sourceList.tableCards.splice(source.index, 1);

        // assign removed card to the new table
        removed.tableId = destination.droppableId;

        // add card to destination table
        destList.tableCards.splice(destination.index, 0, removed);

        // update position of all cards in source table
        sourceList.tableCards.forEach((card, index) => {
          card.position = index
        })

        // update the position of all cards in destination table
        destList.tableCards.forEach((card, index) => {
          card.position = index
        })

        setBoardTables(newOrder)
        // todo make api call


      }

    }
  };

  console.log({ boardTables });
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-[100vw] md:w-[calc(100vw-200px)] overflow-x-auto h-[calc(100vh-64px)] flex flex-col items-center"
    >
      <header className="py-3 px-4 bg-slate-900/15 w-full flex-wrap flex items-center">
        <h1 className="text-sm font-bold">{title}</h1>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tables" direction="horizontal" type="TABLE">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full gap-3 flex h-[calc(100vh-64px)] p-4 overflow-x-auto"
            >
              {boardTables.map((table, index) => (
                <Draggable key={table.id} draggableId={table.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <TableCard
                        tableCards={table.tableCards}
                        provided={provided}
                        index={index}
                        id={table.id}
                        title={table.title}
                        backgroundColor={table.backgroundColor}
                        boardId={table.boardId}
                        position={table.position}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <CreateTable boardId={id} tableCount={boardTables.length} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardTables;
