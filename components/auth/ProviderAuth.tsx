'use client'
import React, {Suspense} from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useRouter, usePathname } from 'next/navigation'

export async function ProviderAuth({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const path = usePathname();
    

    return <Suspense fallback={<div>Loading...</div>}>
        {children}
    </Suspense>;
  
}