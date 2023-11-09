import { getAllBillOfLandingsService, markDoneService } from "../../service/accountant"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    lstBillOfLandings: {}
}

export const getAllBillOfLandingsAsyns = createAsyncThunk("getAllBillOfLandings", async (params) => {
    const response = await getAllBillOfLandingsService(params)
    return response.data
})

export const markDoneAsync = createAsyncThunk("markDone", async (id) => {
    const response = await markDoneService(id)
    return response.data
})

export const accountantSlice = createSlice({
    name: "accountantSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllBillOfLandingsAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllBillOfLandingsAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.lstBillOfLandings = action.payload.result
            })

            // mark done
            .addCase(markDoneAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(markDoneAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.lstBillOfLandings = action.payload
            })
    }
})

export const selectAccountant = state => state.accountantSlice
export default accountantSlice.reducer