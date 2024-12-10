import { getBoard } from "@/actions/board.actions"
import BoardTables from "../_components/board-tables"

interface BoardPageProps {
  params: Promise<{ boardId: string }>
}

const BoardPage = async ({
  params,
}: BoardPageProps) => {

  const boardId = (await params).boardId

  const fetchBoard = await getBoard(boardId)

  if (!fetchBoard) return null

  console.log({fetchBoard: fetchBoard.boardTables})
  return (
    <BoardTables 
    id={fetchBoard.id || ""}
    title={fetchBoard.title || ""}
    visibility={fetchBoard.visibility || ""}
    image={fetchBoard.image || ""}
    category={fetchBoard.category || ""}
    boardTables={fetchBoard.boardTables || []}

    />
  )
}

export default BoardPage
