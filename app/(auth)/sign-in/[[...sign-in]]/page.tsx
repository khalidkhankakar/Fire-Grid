'use client';
import { SignIn } from '@clerk/nextjs'
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes'
export default function Page() {
  const {theme} = useTheme();
  return <SignIn
  appearance={{
    baseTheme: theme === 'dark' ? dark : undefined ,
   }} 
  />
}