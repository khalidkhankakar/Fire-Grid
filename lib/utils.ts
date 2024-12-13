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
  orgId: z.string().optional(),
  visibility: z.string(),
  background: z.string().min(2, {
      message: "Background is required.",
  })
})



export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(50).optional(),
  description: z.string().min(2).max(500).optional(),
  deadline: z.string().optional(),
  labels: z.array(z.object({
      title: z.string().min(2).max(50),
      color: z.string().min(2).max(50),
  })).optional(),
  position: z.number().optional(),
  cardColor: z.string().min(2).max(50).optional(),
  coverImage: z.string().min(2).max(50).optional(),
  category: z.string().min(2).max(50).optional()
})