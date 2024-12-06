'use client';
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import useDebounce from '@/hooks/use-debounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const deboundedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: window.location.href,
      query: {
        search: deboundedSearchTerm
      }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
  }, [router, deboundedSearchTerm])


  return (
    <div className='flex gap-x-2 items-center'>
      <div className="bg-white dark:bg-dark-1 flex items-center border-b-2  border-blue-500 overflow-hidden  ">
        <Search className='text-blue-600' />
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type="text" placeholder="Find a board" className="w-full py-2 px-3 outline-none font-poppins font-normal bg-white dark:bg-dark-1" />
      </div>
      <Button variant={'icon'} className='rounded-lg'>Search</Button>
    </div>
  )
}

export default SearchBar
