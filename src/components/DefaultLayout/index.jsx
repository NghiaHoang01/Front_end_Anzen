import { Route, Routes } from "react-router-dom"
import Home from "../../page/Home"
import Customer from "../../page/Customer"
import Slidebar from "../slidebar"
import Accountant from "../../page/Accountant"
import Register from "../../page/Register"
import Driver from "../../page/Driver"
import ExportReport from "../../page/ExportReport"
import Policy from "../../page/Policy"
import Report from "../../page/Report"

const DefaultLayout = () => {
    return <>
        <Slidebar />
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/accountant" element={<Accountant />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/drivers" element={<Driver />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/export-reports" element={<ExportReport />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </>
}

export default DefaultLayout