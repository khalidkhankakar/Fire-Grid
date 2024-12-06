import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout  ({children}:Readonly<AuthLayoutProps>) {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {children}
    </div>
  )
}

