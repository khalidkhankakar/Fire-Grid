import { Room } from "@/components/shared/liveblocks-room"
import BoardTables from "../_components/board/board-tables"

interface BoardPageProps {
  params: Promise<{ boardId: string }>
}

const BoardPage = async ({
  params
}: BoardPageProps) => {

  const boardId = (await params).boardId


  return (
    <Room roomId={boardId} >
      <BoardTables id={boardId} />
    </Room>
  )
}

export default BoardPage
