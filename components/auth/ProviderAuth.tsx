'use client'
import React, {Suspense} from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'


export async function ProviderAuth({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const token = useAppSelector((state) => state.userReducer.accesstoken)

    // const revalidatedData = await fetch(`https://api.chucknorris.io/jokes/random`, {
    //     // next: { revalidate: 60 },
    //     cache: 'no-store',
    //     // headers: {
    //     //   'Authorization': 'Bearer ' + token,
    //     //   'Content-Type': 'application/json'
    //     // }
    // })

    // if(revalidatedData.ok){
    //     let datos = revalidatedData.json;
    //     console.log(datos)
        return <Suspense fallback={<div>Loading...</div>}>
            {children}
      </Suspense>;
    // }

    router.push('/')

    return <></>;

}