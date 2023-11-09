import { configureStore } from "@reduxjs/toolkit";
import accountantSlice from "../page/Accountant/accountantSlice";
import customerSlice from "../page/Customer/customerSlice";
import driverSlice from "../page/Driver/driverSlice";
import exportReportSlice from "../page/ExportReport/ExportReportSlice";
import homeSlice from "../page/Home/homeSlice";
import loginSlice from "../page/Login/loginSlice";
import policySlice from "../page/Policy/policySlice";
import RegisterSlice from "../page/Register/registerSlice";

export const store = configureStore({
    reducer: {
        loginSlice: loginSlice,
        homeSlice: homeSlice,
        customerSlice: customerSlice,
        accountantSlice: accountantSlice,
        registerSlice: RegisterSlice,
        driverSlice: driverSlice,
        exportReportSlice: exportReportSlice,
        policySlice: policySlice,
    }
})
