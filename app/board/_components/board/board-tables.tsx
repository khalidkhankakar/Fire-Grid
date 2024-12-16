'use client';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import CreateTable from '../table/create-table';
import TableCard from '../table/table-card';
import { Table } from '@/types';
import { updateTablePosition } from '@/actions/table.actions';
import { useToast } from '@/hooks/use-toast';
import { updateCardPosition } from '@/actions/card.actions';
import { CursorPresence } from '@/components/shared/cursor-presence';
import { useMutation } from '@liveblocks/react';
import { useQuery } from '@tanstack/react-query';
import { getBoard } from '@/actions/board.actions';
interface BoardTablesProps {
  id: string;
}

const reorder = <T,>(
  list: T[],
  startIndex: number,
  endIndex: number
): { updatedList: T[]; changedItem: T } => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return { updatedList: result, changedItem: removed };
};

const BoardTables = ({ id }: BoardTablesProps) => {

  const {data, isLoading} = useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      const board = await getBoard(id);
      return board;
    },

  })

  useEffect(() => {
    if (data?.boardTables) {
      setBoardTables(data?.boardTables);
    }
  },[data?.boardTables])


  const [boardTables, setBoardTables] = useState(data?.boardTables || []);
  const { toast } = useToast();


  const handleDragEnd = async (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const isSamePosition =
      source.droppableId === destination.droppableId && source.index === destination.index;

    if (isSamePosition) return;


    if (type === 'TABLE') {
      // Only update the positions if they change
      const { updatedList, changedItem } = reorder(
        boardTables,
        source.index,
        destination.index
      );

      setBoardTables(updatedList);

      await updateTablePosition({
        tableId: changedItem.id,
        position: destination.index,
      });

      toast({ title: 'Table position updated successfully.' });
    }

    if (type === 'CARD') {
      const newOrder = [...boardTables];
      const sourceList = newOrder.find((table) => table.id === source.droppableId);
      const destList = newOrder.find((table) => table.id === destination.droppableId);

      if (!sourceList || !destList) return;

      if (sourceList.id === destList.id) {
        const { updatedList, changedItem } = reorder(
          sourceList.tableCards || [],
          source.index,
          destination.index
        );

        sourceList.tableCards = updatedList;
        setBoardTables(newOrder);

        await updateCardPosition({
          cardId: changedItem.id,
          tableId: sourceList.id,
          position: destination.index,
        });

        toast({ title: 'Card position updated successfully.' });
      } else {
        // Moving between lists
        const [removed] = sourceList.tableCards.splice(source.index, 1);
        removed.tableId = destination.droppableId;

        destList.tableCards.splice(destination.index, 0, removed);

        sourceList.tableCards.forEach((card, index) => {
          card.position = index;
        });

        destList.tableCards.forEach((card, index) => {
          card.position = index;
        });

        setBoardTables(newOrder);

        // Batch API calls
        await Promise.all([
          ...sourceList.tableCards.map((card) =>
            updateCardPosition({ cardId: card.id, tableId: sourceList.id, position: card.position })
          ),
          ...destList.tableCards.map((card) =>
            updateCardPosition({ cardId: card.id, tableId: destList.id, position: card.position })
          ),
        ]);

        toast({ title: 'Card moved successfully.' });
      }
    }

  };

  const onPointerMove = useMutation((
    { setMyPresence },
    e: React.PointerEvent
  ) => {
    e.preventDefault();
    const current = { x: e.clientX, y: e.clientY };
    setMyPresence({ cursor: current })
  }, [])

  if(isLoading) return <div>Loading...</div>
  return (

    <div
      onPointerMove={onPointerMove}
      style={{
        backgroundImage: `url(${data?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-[100vw] overflow-x-auto h-[calc(100vh-64px)] flex flex-col items-center"
    >
      <header className="py-3 px-4 bg-slate-900/15 w-full flex-wrap flex items-center">
        <h1 className="text-sm font-bold">{data?.title}</h1>
      </header>
      <CursorPresence />
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
