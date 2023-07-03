import { apiClient } from './ApiClient'

export const retrieveAllUserCryptocurrenciesForUsernameApi
    = (username) => apiClient.get(`/users/${username}/cryptocurrencies`)

export const deleteUserCryptocurrencyApi
    = (username, id) => apiClient.delete(`/users/${username}/cryptocurrencies/${id}`)

export const retrieveUserCryptocurrencyApi
    = (username, userCryptocurrency) => apiClient.get(`/users/${username}/cryptocurrencies/${userCryptocurrency}`)

export const updateUserCryptocurrencyApi
    = (username, id, userCryptocurrency) => apiClient.put(`/users/${username}/cryptocurrencies/${id}`, userCryptocurrency)

export const createUserCryptocurrencyApi
    = (username,  userCryptocurrency) => apiClient.post(`/users/${username}/cryptocurrencies`, userCryptocurrency)
