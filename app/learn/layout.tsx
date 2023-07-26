'use client'

import SideNavbar from '@/components/navs/SideNavbar'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useRouter, usePathname } from 'next/navigation'
import {useEffect} from 'react'



export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter();
    const path = usePathname();
    const token = useAppSelector( (state) => state.userReducer.accesstoken )
    
    // useEffect(() => {
    //   if( !token ){
    //     router.push('/');
    //   }
    //   console.log(path)
    // }, )

    // if( !token ){
    //   return <div>Loading...</div>
    // }

    
    return (
      <div className='flex w-full'>  
          <SideNavbar />
          {children}
      </div>
    )
  }