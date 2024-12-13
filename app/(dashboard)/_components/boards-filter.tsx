'use client';
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import qs from 'query-string'
import { useRouter } from "next/navigation";

interface BoardsFilterProps {
  filter: { type:string, data: { Text: string, value: string }[] }
}

const BoardsFilter = ({filter}: BoardsFilterProps) => {

  const [value, setValue] = React.useState<string | null>(null)

  const router = useRouter()

  React.useEffect(()=>{
    const url = qs.stringifyUrl({
        url: window.location.href,
        query: {
            [filter.type]:value 
        }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
}, [router, value, filter.type])

  if (value) {
    return (
      <Button onClick={() => setValue(null)} variant={'icon'} className="bg-white dark:bg-dark-1 rounded-full text-blue-600 border border-blue-600 flex items-center py-1 px-3 gap-x-2 " asChild>
        <div>
          <p>{value}</p>
          <X className="h-4 w-4" />
        </div>
      </Button>
    )
  }


  return (
    <Select value={value || ''} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="w-fit space-x-1 text-xs md:text-sm md:space-x-2 rounded-xl bg-white dark:bg-dark-1">
        <SelectValue placeholder={filter.type.charAt(0).toUpperCase() + filter.type.slice(1)} />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-dark-1">
        <SelectGroup >    
          {
            filter.data.map((item, index) => (
              <SelectItem key={index} value={item.value}>{item.Text}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>

  )
}

export default BoardsFilter
