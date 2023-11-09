import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDeliveryOrderService, deleteDeliveryService, downloadAccountingService, downloadReceiptService, exportGridService, getAllDeliveryOrdersService, getDetailsAccountingService, getDetailsDeliveryOrderService, getInforByPhoneNumberService, getPhoneNumberBySearchService, getPhoneNumberService, getSaleStaffService } from "../../service/home";

const initialState = {
    isLoading: false,
    deliveryOrders: {},
    deliveryItem: {},
    listSaleStaff: [],
    listPhone: [],
    shipper: {},
    consignee: {},
    exportExcel: {},
    accounting: {},
}

export const getAllDeliveryOrdersAsync = createAsyncThunk('getAllDeliveryOrder', async (params) => {
    const response = await getAllDeliveryOrdersService(params)
    return response.data
})

export const deleteDeliveryAsync = createAsyncThunk('deleteDelivery', async (id) => {
    const response = await deleteDeliveryService(id);
    return response.data
})

export const getSaleStaffAsync = createAsyncThunk("getSaleStaff", async () => {
    const respone = await getSaleStaffService()
    return respone.data
})

export const getPhoneNumberAsync = createAsyncThunk("getPhoneNumber", async () => {
    const respone = await getPhoneNumberService()
    return respone.data
})

export const createDeliveryOrderAsync = createAsyncThunk("createDelivery", async (params) => {
    const respone = await createDeliveryOrderService(params)
    return respone.data
})

export const getInforShipperByPhoneAsync = createAsyncThunk("getInforShipperByPhone", async (id) => {
    const respone = await getInforByPhoneNumberService(id)
    return respone.data
})

export const getInforConsigneeByPhoneAsync = createAsyncThunk("getInforConsigneeByPhone", async (id) => {
    const respone = await getInforByPhoneNumberService(id)
    return respone.data
})

export const getPhonNumberBySearchAsync = createAsyncThunk("getPhonNumberBySearch", async (params) => {
    const respone = await getPhoneNumberBySearchService(params)
    return respone.data
})

export const getDetailDeliverOrderAsync = createAsyncThunk("getDetailDeliverOrder", async (id) => {
    const respone = await getDetailsDeliveryOrderService(id)
    return respone.data
})

export const exportGridAsync = createAsyncThunk("exportGrid", async (params) => {
    const respone = await exportGridService(params)
    return respone.data
})

export const getDetailAccountingAsync = createAsyncThunk("getDetailAccounting", async (id) => {
    const respone = await getDetailsAccountingService(id)
    return respone.data
})

export const downloadReceiptAsync = createAsyncThunk("downloadReceipt", async (id) => {
    const respone = await downloadReceiptService(id)
    return respone.data
})

export const downloadAccountingAsync = createAsyncThunk("downloadAccounting", async(id) => {
    const respone = await downloadAccountingService(id)
    return respone.data
})

export const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // get delivery
            .addCase(getAllDeliveryOrdersAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllDeliveryOrdersAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.deliveryOrders = action.payload.result
                }
            })

            // delete delivery
            .addCase(deleteDeliveryAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteDeliveryAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.deliveryItem = action.payload
                }
            })

            // get sale staff
            .addCase(getSaleStaffAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getSaleStaffAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.listSaleStaff = action.payload.result
                }
            })

            // get phone number
            .addCase(getPhoneNumberAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getPhoneNumberAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.listPhone = action.payload.result.items
                }
            })

            // create new delivery order
            .addCase(createDeliveryOrderAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(createDeliveryOrderAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.deliveryItem = action.payload
                }
            })

            // get infor shipper
            .addCase(getInforShipperByPhoneAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getInforShipperByPhoneAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.shipper = action.payload.result
                }
            })

            // get infor consignee
            .addCase(getInforConsigneeByPhoneAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getInforConsigneeByPhoneAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.consignee = action.payload.result
                }
            })

            // get phone number by search
            .addCase(getPhonNumberBySearchAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getPhonNumberBySearchAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.listPhoneSearch = action.payload.result.items
                }
            })

            // get detail delivery order
            .addCase(getDetailDeliverOrderAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getDetailDeliverOrderAsync.fulfilled, (state, action) => {
                if (action.payload) { 
                    state.deliveryItem = action.payload.result
                    state.isLoading = false;
                }
            })

            // export excel
            .addCase(exportGridAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(exportGridAsync.fulfilled, (state, action) => {
                if (action.payload) { 
                    state.isLoading = false;
                    state.exportExcel = action.payload
                }
            })

            // get detail accounting
            .addCase(getDetailAccountingAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(getDetailAccountingAsync.fulfilled, (state, action) => {
                if (action.payload) { 
                    state.isLoading = false;
                    state.accounting = action.payload
                }
            })

            // download receipt
            .addCase(downloadReceiptAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(downloadReceiptAsync.fulfilled, (state, action) => {
                if (action.payload) { 
                    state.isLoading = false;
                }
            })

            // download accounting
            .addCase(downloadAccountingAsync.pending, state => {
                state.isLoading = true;
            })
            .addCase(downloadAccountingAsync.fulfilled, (state, action) => {
                if (action.payload) { 
                    state.isLoading = false;
                }
            })
    }
})

export const selectDeliveryOrders = state => state.homeSlice;
export default homeSlice.reducer;