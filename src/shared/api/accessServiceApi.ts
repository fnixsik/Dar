import { createApiClient } from '../service/createApiClient'
import { API_BASE_URL } from '../service/api'

export const accessServiceApi = createApiClient({
    baseURL: API_BASE_URL,

})