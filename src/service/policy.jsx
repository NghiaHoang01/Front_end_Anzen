import queryString from "query-string"
import request from "../utils/request"

export const getAllPolicyServie = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

export const getLicenseplatesService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/search-by-licenseplate?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}