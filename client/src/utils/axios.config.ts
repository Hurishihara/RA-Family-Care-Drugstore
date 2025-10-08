import axios from 'axios';


export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => Promise.reject(err)
)


api.interceptors.response.use(
    response => response,
    async err => {
        const originalRequest = err.config;
        const shouldRefreshAccessToken =
            axios.isAxiosError(err) &&
            err.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/refresh') &&
            err.response.data?.description === 'Access token expired or invalid. Please refresh token.';
        if (shouldRefreshAccessToken) {
            originalRequest._retry = true;
            try {
                
                const refreshResponse = await api.post('/auth/refresh')
                const { accessToken } = refreshResponse.data;
                console.log('Token refreshed:', refreshResponse);
                localStorage.setItem('accessToken', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            }
            catch (err) {
                console.error('Refresh token failed:', err);
                localStorage.removeItem('accessToken');
                return Promise.reject(err);
            }
        }

        if (axios.isAxiosError(err)) {
            if (err.response) {
                return Promise.reject(err);
            } else {
                // Network error
                return Promise.reject({
                    title: err.message || 'Network Error',
                    description: 'Unable to reach the server. Please try again later.'
                });
            }
        }
        
        // For non-Axios errors
        return Promise.reject({
            title: 'Unknown Error',
            description: 'An unexpected error occurred.'
        });
    }
)