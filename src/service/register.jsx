import queryString from 'query-string'
import request from '../utils/request'

export const getAllApplicationUsersService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

export const changeRoleApplicationUserService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/change-role`, {
        method: 'POST',
        data: params
    })
}

export const activeService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/active`, {
        method: 'POST',
        data: params
    })
}

export const createNewApplicationUserService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser`, {
        method: 'POST',
        data: params
    })
}