import queryString from "query-string"
import request from "../utils/request";

export const getAllDeliveryOrdersService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders?${queryString.stringify(params)}`, {
        method: 'GET',
    })
}

export const deleteDeliveryService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/${id}`, {
        method: "DELETE",
    })
}

export const getSaleStaffService = () => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/get-sale-staff`, {
        method: "GET",
    })
}

export const getPhoneNumberService = () => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/search-by-phone?pageIndex=1&pageSize=50`, {
        method: "GET",
    })
}

export const createDeliveryOrderService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders`, {
        method: "POST",
        data: params
    })
}

export const getInforByPhoneNumberService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/${id}`, {
        method: "GET",
    })
}

export const getPhoneNumberBySearchService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/search-by-phone?filter=${params}&pageIndex=1&pageSize=50`, {
        method: "GET",
    })
}

export const getDetailsDeliveryOrderService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/${id}`, {
        method: "GET",
    })
}

export const exportGridService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/export-grid?${queryString.stringify(params)}`, {
        method: "GET",
    })
}

export const getDetailsAccountingService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/accounting/${id}`, {
        method: "GET"
    })
}

export const downloadReceiptService = (id) => {

    const token = localStorage.getItem('access_token')

    if (token) {
        return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/export-receipt/${id}`, {
            method: "GET",
            responseType: 'arraybuffer',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export const downloadAccountingService = (id) => {

    const token = localStorage.getItem('access_token')

    if (token) {
        return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/export-accounting/${id}`, {
            method: "GET",
            responseType: "arraybuffer",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }
}