import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfileService } from "../../service/login";

const initialState = {
    isLoading: false,
    userInfor: {}
}
export const getUserProfileAsync = createAsyncThunk('getInfoUser', async () => {
    const response = await getUserProfileService()
    return response.data
})


export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUserProfileAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUserProfileAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.userInfor = action.payload.result
                }
            })
    }
})

export const selectLogin = state => state.loginSlice;
export default loginSlice.reducer;
