import { getBoard } from "@/actions/board.actions"
import BoardTables from "../_components/board/board-tables"
import { Room } from "@/components/shared/liveblocks-room"

interface BoardPageProps {
  params: Promise<{ boardId: string }>
}

const BoardPage = async ({
  params,
}: BoardPageProps) => {
  
  const boardId = (await params).boardId
  const fetchBoard = await getBoard(boardId)
  if (!fetchBoard) return null

  return (
    <Room roomId={boardId} >
    <BoardTables
      id={fetchBoard?.id || ""}
      title={fetchBoard?.title || ""}
      image={fetchBoard?.image || ""}
      boardTables={fetchBoard?.boardTables || []}
      // visibility={fetchBoard?.visibility || ""}
      // category={fetchBoard?.category || ""}
    />
    </Room>
  )
}

export default BoardPage
