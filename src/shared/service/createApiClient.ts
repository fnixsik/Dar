import axios from "axios";
import type { AxiosInstance } from "axios";

interface CreateApiClientOptions {
    baseURL: string
    withCredentials?: boolean
    headers?: Record<string, string>
}

export function createApiClient({baseURL, withCredentials = true, headers = {}}: CreateApiClientOptions): AxiosInstance {
    return axios.create({
        baseURL,
        withCredentials,
        headers,
    })
}