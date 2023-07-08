'use client'

import SideNavbar from '@/components/navs/SideNavbar'
import React from 'react'

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    let token = '';
     
    // const revalidatedData = await fetch(`https://...`, {
    //   next: { revalidate: 60 },
    //   headers: {
    //     'Authorization': 'Bearer ' + token,
    //     'Content-Type': 'application/json'
    //   }
    // }
    // );

      return (
        <div className='flex w-full'>  
            <SideNavbar />
            {children}
        </div>
      )
  }