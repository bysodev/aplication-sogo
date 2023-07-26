'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    email: string | null, 
    password: string | null,
    accesstoken: string | null,
    logget: boolean | null
}

const initialState: UserState ={
    email: '', 
    password: '', 
    accesstoken: '',
    logget: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggin: (state, action: PayloadAction<UserState> ) => {
            const {email, accesstoken, password, logget} = action.payload
            state.email = email
            state.password = password
            state.accesstoken = accesstoken
            state.logget = logget
        },
        setCredential: (state, action: PayloadAction<UserState> ) => {
            const {email, accesstoken, password} = action.payload
            state.email = email
            state.password = password
            state.accesstoken = accesstoken
        },
        logOut: (state, action) => {
            state.email = null
            state.accesstoken = null
            state.password = null
        }
    }
});

export const {setCredential, logOut, setLoggin} = authSlice.actions;

export default authSlice.reducer;