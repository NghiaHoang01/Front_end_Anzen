import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllPolicyServie, getLicenseplatesService } from "../../service/policy"

const initialState = {
    isLoading: false,
    policys: {},
    listLicenseplates: []
}

export const getAllPolicyAsync = createAsyncThunk('getAllPolicy', async (params) => {
    const response = await getAllPolicyServie(params)
    return response.data
})

export const getLicenseplatesAsync = createAsyncThunk('Licenseplates', async (params) => {
    const response = await getLicenseplatesService(params)
    return response.data
})

export const policySlice = createSlice({
    name: 'policySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get all policy 
            .addCase(getAllPolicyAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllPolicyAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.policys = action.payload.result
            })

            // get all Licenseplate 
            .addCase(getLicenseplatesAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(getLicenseplatesAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listLicenseplates = action.payload.result.items
            })
    }
})

export const selectPolicy = state => state.policySlice
export default policySlice.reducer;