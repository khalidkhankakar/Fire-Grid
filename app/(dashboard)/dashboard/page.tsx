import React, { Suspense } from 'react'
import { getBoards } from '@/actions/search-filter.actions'
import SearchBar from '../_components/search-bar'
import { Filter } from 'lucide-react'
import BoardsFilter from '../_components/boards-filter'
import { CATEGORY_FILTER, DATETIME_FILTER, ORDER_FILTER } from '@/contants'
import { CreateBoardButton } from '../_components/create-board-button'
import NoResult from '../_components/no-result'
import { Button } from '@/components/ui/button'
import BoardCard from '../_components/board-card'


export type SearchParams = {
  type?: 'team' | 'favorite'
  search?: string
  category?: string
  datetime?: string
  page?: string
  order?: string
}

const renderNoResult = (type: string | undefined, noBoardsFound: boolean, search: string | undefined, category: string | undefined, datetime: string | undefined) => {
  if (noBoardsFound) {
    if (type === 'team') {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards found in team' description='No team boards found with the applied filters' />
        : <NoResult imgSrc='/team.svg' title='No boards found in Team Workspace' description='Try to create something' />
    }

    if (type === 'favorite') {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards in favorite' description='No favorite boards found with the applied filters' />
        : <NoResult imgSrc='/favorite.svg' title='No boards found in Favorite workspace' description='Try favoriting something' />
    }

    if (!type) {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards in personal' description='No personal boards found with the applied filters' />
        : (
          <NoResult imgSrc='/personal.svg' title='No boards found in Personal workspace' description='Try to create something'>
            <CreateBoardButton>
              <Button>Create Board</Button>
            </CreateBoardButton>
          </NoResult>
        )
    }
  }

  return null
}

const renderBoards = (boards: any[], noBoardsFound: boolean) => {
  if (noBoardsFound) return null;

  return boards.map((board) => (
    <BoardCard key={board.id}
      id={board.id}
      title={board.title}
      createdAt={board.createdAt}
      visibility={board.visibility}
      image={board.image}
      category={board.category}
      orgId={board.orgId || ""}
      isFavorite={board.isFavorite}
      createdBy={board.createdBy}
    />
  ))
}

const Page = async ({ searchParams }: { searchParams?: Promise<SearchParams> }) => {
  const { type, search, category, datetime, page, order } = await searchParams || {};

  const boards = await getBoards({ type, search, category, datetime, page, order });
  const noBoardsFound = boards.length <= 0;


  return (
    <div className='w-full border min-h-[calc(100vh-64px)] p-4'>
      <div className='flex flex-col md:flex-row justify-between'>
        <h1 className='text-xl md:text-3xl'>
          {type === "team" ? "Team Workspace" : type === "favorite" ? "Favorite Workspace" : "Personal Workspace"}
        </h1>
        <SearchBar />
      </div>

      <div className='my-3 rounded-md bg-white px-3 py-3 dark:bg-dark-1 flex flex-wrap items-center shadow-md justify-between gap-y-2'>
        <div className='flex text-slate-400 items-center gap-x-2'>
          <Filter fill='#94a3b8' className='w-6 h-6' />
          <span className='font-semibold'>Filter</span>
        </div>
        <div className='flex gap-x-2'>
          <BoardsFilter filter={CATEGORY_FILTER} />
          <BoardsFilter filter={DATETIME_FILTER} />
          <BoardsFilter filter={ORDER_FILTER} />
        </div>
      </div>

      <div className='my-5 flex flex-wrap gap-3'>
      <Suspense fallback={<p>Loading feed...</p>}>
        {renderNoResult(type, noBoardsFound, search, category, datetime)}
        {renderBoards(boards, noBoardsFound)}
      </Suspense>
      </div>
    </div>
  );
}

export default Page;
