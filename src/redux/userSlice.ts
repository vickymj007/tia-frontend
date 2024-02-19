import { createSlice } from "@reduxjs/toolkit";


type User = {
    name: string,
    email: string,
    password: string,
    loginCount: number,
    isActive: boolean,
    isAdmin: boolean
}

type InState = {
    user: null | User,
    isLoggedIn: boolean
    users: any
}

const initialState: InState = {
    user: null,
    isLoggedIn: false,
    users: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true
            state.user = action.payload
        },
        logout(state) {
            state.isLoggedIn = false
            state.user = null
        },
        setUsers(state, action) {
            state.users = action.payload
        }

    }
})

export const { login, logout, setUsers } = userSlice.actions
export default userSlice.reducer