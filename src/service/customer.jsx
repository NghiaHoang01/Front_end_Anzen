import queryString from "query-string"
import request from "../utils/request";

export const getCustomersService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers?${queryString.stringify(params)}`, {
        method: 'GET',
    })
}

export const createNewCustomerService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers`, {
        method: 'POST',
        data: params,
    })
}

export const deleteCustomerService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/${id}`, {
        method: 'DELETE',
    })
}