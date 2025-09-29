import { api } from '@/utils/axios.config';
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';

type UseApi = {
    url: string;
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    data?: any;
}

interface UseApiQuery<T = any> extends Omit<UseApi, 'data'> {
    queryKey: string[];
    options?: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>;
}


const useApi = async <T = any>({ url, method, data }: UseApi): Promise<T> => {
    const config = {
        method,
        url,
        data,
    }

    try {
        const response = await api(config);
        return response.data as T;
    }
    catch (err) {
        throw err;
    }
}

export const useApiQuery = <T>({
    url,
    queryKey,
    method = 'GET',
    options
}: UseApiQuery) => {
    return useQuery<T>({
        queryKey: queryKey,
        queryFn: () => useApi<T>({ url, method }),
        ...options
    })
}


export const useApiMutation = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    config: UseApi,
    options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
    return useMutation({
        mutationFn: async (variables: TVariables) => {
            // For PATCH requests, wrap variables in { fields: ... } to match backend expected format
            const dataToSend = config.method === 'PATCH' ? { fields: {
                name: (variables as any).medicineName, 
                ...variables
            } } : variables;
            return useApi<TData>({
                url: config.url,
                method: config.method,
                data: dataToSend
            })
        },
        ...options
    })
}