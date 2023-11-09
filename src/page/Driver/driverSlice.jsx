import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNewDriverService, deleteDriverService, getAllDriversService } from "../../service/driver"

const initialState = {
    isLoading: false,
    drivers: {},
    driver: {}
}

export const getAllDriversAsyns = createAsyncThunk("getAllDrivers", async (params) => {
    const response = await getAllDriversService(params)
    return response.data
})

export const createNewDriverAsyns = createAsyncThunk("createNewDriver", async (params) => {
    const response = await createNewDriverService(params)
    return response.data
})

export const deleteDriverAsyns = createAsyncThunk("deleteDriver", async (params) => {
    const response = await deleteDriverService(params)
    return response.data
})

export const driverSlice = createSlice({
    name: "driverSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // get all drivers
            .addCase(getAllDriversAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllDriversAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.drivers = action.payload.result
            })

            // create new driver
            .addCase(createNewDriverAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(createNewDriverAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.driver = action.payload.result
            })

            // delete driver
            .addCase(deleteDriverAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteDriverAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.driver = action.payload.result
            })
    }
})

export const selectDriver = state => state.driverSlice
export default driverSlice.reducer;
