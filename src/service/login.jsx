import request from "../utils/request";

export const loginService = (params) => {
    return request('https://api-uat-anzen-tms.azurewebsites.net/api/Account/login', {
        method: 'POST',
        data: params
    })
}

export const getUserProfileService = () => {
    return request('https://api-uat-anzen-tms.azurewebsites.net/api/Account/get-user-profile', {
        method: 'GET',
    })
}