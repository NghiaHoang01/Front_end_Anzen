import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteExportReportService, getAllExportREportsService } from "../../service/export_report"

const initialState = {
    isLoading: false,
    exportReports: {},
    item: {}
}

export const getAllExportReportsAsyns = createAsyncThunk('getAllExportReports', async (params) => {
    const response = await getAllExportREportsService(params)
    return response.data
})

export const deleteExportReportsAsyns = createAsyncThunk('deleteExportReport', async (id) => {
    const response = await deleteExportReportService(id)
    return response.data
})

export const exportReportSlice = createSlice({
    name: 'exportReportSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get all export report
            .addCase(getAllExportReportsAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllExportReportsAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.exportReports = action.payload.result
            })

            // delete export report
            .addCase(deleteExportReportsAsyns.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteExportReportsAsyns.fulfilled, (state, action) => {
                state.isLoading = false
                state.item = action.payload
            })
    }
})

export const selectExportReport = state => state.exportReportSlice
export default exportReportSlice.reducer;