import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNewCustomerService, deleteCustomerService, getCustomersService } from "../../service/customer"

const initialState = {
    isLoading: false,
    listCutomers: {},
    customer: {}
}

export const getCustomersAsync = createAsyncThunk("getCustomers", async (params) => {
    const response = await getCustomersService(params)
    return response.data
})

export const createNewCustomerAsync = createAsyncThunk("createNewCustomer", async (params) => {
    const response = await createNewCustomerService(params)
    return response.data
})

export const deleteCustomerAsync = createAsyncThunk("deleteCustomer", async (id) => {
    const response = await deleteCustomerService(id)
    return response.data
})

export const customerSlice = createSlice({
    name: "customerSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get all customers
            .addCase(getCustomersAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(getCustomersAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listCutomers = action.payload.result
            })

            //create new customer
            .addCase(createNewCustomerAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(createNewCustomerAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.customer = action.payload
            })

            //delete new customer
            .addCase(deleteCustomerAsync.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.customer = action.payload
            })
    }
})

export const selectCustomers = state => state.customerSlice
export default customerSlice.reducer;