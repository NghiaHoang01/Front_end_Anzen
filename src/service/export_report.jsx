import queryString from "query-string";
import request from "../utils/request";

export const getAllExportREportsService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DownloadCenters?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

export const deleteExportReportService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DownloadCenters/${id}`, {
        method: 'DELETE'
    })
}