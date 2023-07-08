import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    email: string | null, 
    password: string | null,
    accesstoken: string | null
}

const initialState: UserState ={
    email: '', 
    password: '', 
    accesstoken: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action ) => {
            const {email, accesstoken, password} = action.payload
            console.log({email, accesstoken, password});
            state.email = email
            state.password = password
            state.accesstoken = accesstoken
            console.log(state)
        },
        logOut: (state, action) => {
            state.email = null
            state.accesstoken = null
            state.password = null
        }
    }
});

export const {setCredential, logOut} = authSlice.actions;

export default authSlice.reducer;