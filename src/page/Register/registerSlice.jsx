import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { activeService, changeRoleApplicationUserService, createNewApplicationUserService, getAllApplicationUsersService } from "../../service/register"

const initialState = {
    isLoading: false,
    applicationUsers: {},
    changeRole: {},
    account: {}
}

export const getAllApplicationUsersAsync = createAsyncThunk('getAllApplicationUsers', async (params) => {
    const response = await getAllApplicationUsersService(params)
    return response.data
})

export const changeRoleApplicationUsersAsyns = createAsyncThunk('changeRoleApplicationUsers', async (params) => {
    const response = await changeRoleApplicationUserService(params)
    return response.data
})

export const activeAsyns = createAsyncThunk('active', async (params) => {
    const response = await activeService(params)
    return response.data
})

export const createNewApplicationUserAsyns = createAsyncThunk('createNewApplicationUser', async (params) => {
    const response = await createNewApplicationUserService(params)
    return response.data
})

export const registerSlice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get application users
            .addCase(getAllApplicationUsersAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllApplicationUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.applicationUsers = action.payload.result
            })

            // change role
            .addCase(changeRoleApplicationUsersAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(changeRoleApplicationUsersAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.changeRole = action.payload
            })

            // active
            .addCase(activeAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(activeAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.changeRole = action.payload
            })

            // create new
            .addCase(createNewApplicationUserAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(createNewApplicationUserAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.account = action.payload
            })
    }
})

export const selectRegister = state => state.registerSlice
export default registerSlice.reducer;