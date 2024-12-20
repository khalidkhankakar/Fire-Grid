import React, { Suspense } from 'react'
import { currentUser } from '@clerk/nextjs/server'

import { Button } from '@/components/ui/button'
import { Filter, Plus } from 'lucide-react'

import SearchBar from '../_components/search-bar'
import BoardsFilter from '../_components/boards-filter'
import { CreateBoardButton } from '../_components/create-board-button'
import NoResult from '../_components/no-result'
import BoardCard from '../_components/board-card'
import OrgBoardButton from '../_components/org-board-button'
import OrgSwitcher from '../_components/org-switcher'
import Pagination from '@/components/shared/pagination'

import { getBoards } from '@/actions/search-filter.actions'

import { CATEGORY_FILTER, DATETIME_FILTER, ORDER_FILTER } from '@/contants'
import { Board, SearchParams } from '@/types'





const renderNoResult = (type: string | undefined, noBoardsFound: boolean, search: string | undefined, category: string | undefined, datetime: string | undefined) => {
  if (noBoardsFound) {
    if (type === 'team') {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards found in team' description='No team boards found with the applied filters' />
        : <NoResult imgSrc='/team.svg' title='No boards found in Team Workspace' description='Try to create something'>
          <OrgBoardButton />
        </NoResult>
    }

    if (type === 'favorite') {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards in favorite' description='No favorite boards found with the applied filters' />
        : <NoResult imgSrc='/favorite.svg' title='No boards found in Favorite workspace' description='Try favoriting something' />
    }

    if (type === 'template') {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards in templates' description='No template boards found with the applied filters' />
        : <NoResult imgSrc='/favorite.svg' title='No boards found in Template' description='Make your own template' >
          <CreateBoardButton>
            <Button className='create-board'>Create template</Button>
          </CreateBoardButton>
        </NoResult>
    }

    if (!type) {
      return search || category || datetime
        ? <NoResult imgSrc='/nosearch.svg' title='No searched boards in personal' description='No personal boards found with the applied filters' />
        : (
          <NoResult imgSrc='/personal.svg' title='No boards found in Personal workspace' description='Try to create something'>
            <CreateBoardButton>
              <Button className='create-board'>Create Board</Button>
            </CreateBoardButton>
          </NoResult>
        )
    }
  }

  return null
}

const renderBoards = (boards: Board[], noBoardsFound: boolean) => {
  if (noBoardsFound) return null;

  return boards.map((board) => (
    <Suspense key={board.id} fallback={<div>loading card...</div>}>
      <BoardCard
        id={board.id}
        title={board.title}
        createdAt={board.createdAt}
        visibility={board.visibility}
        image={board.image}
        orgId={board.orgId || ""}
        isFavorite={board.isFavorite}
        createdBy={board.createdBy}
        type={board.type}
      />
    </Suspense>
  ))
}

const Page = async ({ searchParams }: { searchParams?: Promise<SearchParams> }) => {


  const { type, search, category, datetime, page, order } = await searchParams || {};

  const { boards, totalPages } = await getBoards({ type, search, category, datetime, page, order });

  const noBoardsFound = boards.length <= 0;

  const user = await currentUser()
  console.log({
    user
  })

  return (
    <div className='w-[100vw] md:w-full overflow-x-none pb-12 dashboard-section overflow-y-scroll   h-[calc(100vh-64px)] p-4'>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex items-center justify-between gap-x-2'>

          <h1 className='text-xl md:text-3xl'>
            {type === "team" ? "Team Workspace" : type === "favorite" ? "Favorite Workspace" : type === "template" ? "Templates" : "Personal Workspace"}
          </h1>
          <div className='block md:hidden'>
            <OrgSwitcher />
          </div>
        </div>
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

      <div className='my-5 flex flex-wrap items-center justify-center w-full '>
        <div className={`${noBoardsFound ? "hidden" : "block"}`}>

          <CreateBoardButton >
            <div className={`w-[250px] cursor-pointer ${type === 'template' ? 'h-[278px]': 'h-[230px]'} bg-blue-500 shadow-lg flex items-center justify-center flex-col gap-y-2 text-white rounded-lg`}>
              <Plus size={30} />
              <p className='text-sm '>Create Board</p>
            </div>
          </CreateBoardButton>
        </div>

        {renderNoResult(type, noBoardsFound, search, category, datetime)}
        {renderBoards(boards, noBoardsFound)}

      </div>

      <Pagination totalPages={totalPages} currentPage={Number(page) || 1} />
    </div>
  );
}

export default Page;
