

import type { ErrorResponse } from '@/types/error.response';
import axios from 'axios';


export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    err => {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                return Promise.reject(err.response.data as ErrorResponse)
            }
            return Promise.reject({
                title: err.message,
                description: 'Unable to reach the server. Please try again later.'
            })
        }
        return Promise.reject(err)
    }
)