import queryString from "query-string"
import request from "../utils/request"

export const getAllDriversService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

export const createNewDriverService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers`, {
        method: 'POST',
        data: params
    })
}

export const deleteDriverService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/${id}`, {
        method: 'DELETE'
    })
}