import React from 'react'

import BoardsData from '../_components/boards-data'


export type SearchParams = {
  type?:'team' | 'favorite'
  search?:string,
  category?:string,
  datetime?:string
}

const page = async ({searchParams}:{searchParams?: Promise<SearchParams>}) => {

  const type =  (await searchParams)?.type

  const search =  (await searchParams)?.search
  const category =  (await searchParams)?.category
  const datetime =  (await searchParams)?.datetime

  return <BoardsData searchParams={{type,search,category,datetime}}   />
}

export default page
