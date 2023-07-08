import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User = {
    id: number, 
    name: string
    email: number, 
    token: string
}

export const userApi = createApi({
    reducerPath: "userApi",
    refetchOnFocus: true, // Al volver a enfocar la ventana, se recuperan los datos
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.PATH_BACKEND,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], null>({
            query: () => `users`
        }),
        getUserById: builder.query<User, {id: string}>({
            query: ({id}) => ({url: `users/${id}`, }),

            
        })
    })
})

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi