"use client"

import Login from '@/components/auth/Login'
import SideNavbar from '@/components/navs/SideNavbar'
import { useAppSelector } from '@/redux/hooks'
import getQueryClient from '@/util/getQueryClient'


export default async function Home() {
  const user = useAppSelector((state) => state.userReducer.password)
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(['posts'], async () => {

  // })


  return (
    <>
      <Login/>
    </>
  )
}
