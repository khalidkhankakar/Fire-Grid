import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const boardFormSchema = z.object({
  title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
  }),
  category: z.string().min(2, {
      message: "Category is required.",
  }),
  visibility: z.string(),
  background: z.string().min(2, {
      message: "Background is required.",
  })
})