'use client';
import { SignUp } from '@clerk/nextjs'
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes'
export default function Page() {
  const {theme} = useTheme();
  return <SignUp
  appearance={{
    baseTheme: theme === 'dark' ? dark : undefined ,
   }} 
  />
}