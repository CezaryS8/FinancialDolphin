import { apiClient } from './ApiClient'

export const retrieveAllUserCryptocurrenciesForUsernameApi
    = (username) => apiClient.get(`/users/${username}/cryptocurrencies`)

export const deleteUserCryptocurrencyApi
    = (username, id) => apiClient.delete(`/users/${username}/cryptocurrencies/${id}`)

export const retrieveUserCryptocurrencyApi
    = (username, id) => apiClient.get(`/users/${username}/cryptocurrencies/${id}`)

export const updateUserCryptocurrencyApi
    = (username, id, deposit) => apiClient.put(`/users/${username}/cryptocurrencies/${id}`, deposit)

export const createUserCryptocurrencyApi
    = (username,  deposit) => apiClient.post(`/users/${username}/cryptocurrencies`, deposit)
