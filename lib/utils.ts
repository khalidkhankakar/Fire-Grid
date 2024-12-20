import { CURSOR_COLORS } from "@/contants"
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
  }),
  type: z.string().optional(),
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


export const reArrange = <T,>(
  list: T[],
  startIndex: number,
  endIndex: number
): { updatedList: T[]; changedItem: T } => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return { updatedList: result, changedItem: removed };
};

export function formatDate(inputDate:string):string {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


export function getCursorColor(id: number): string {
  return CURSOR_COLORS[id % CURSOR_COLORS.length]
}