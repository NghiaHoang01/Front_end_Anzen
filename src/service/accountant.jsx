import queryString from "query-string";
import request from "../utils/request";

export const getAllBillOfLandingsService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

export const markDoneService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/mark-done/${id}`,{
        method: 'POST'
    })
}