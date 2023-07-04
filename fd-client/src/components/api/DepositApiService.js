import { apiClient } from './ApiClient'

export const retrieveAllDepositsForUsernameApi
    = (username) => apiClient.get(`/users/${username}/deposits`)

export const deleteDepositApi
    = (username, id) => apiClient.delete(`/users/${username}/deposits/${id}`)

export const retrieveDepositApi
    = (username, id) => apiClient.get(`/users/${username}/deposits/${id}`)

export const updateDepositApi
    = (username, id, deposit) => apiClient.put(`/users/${username}/deposits/${id}`, deposit)

export const createDepositApi
    = (username,  deposit) => apiClient.post(`/users/${username}/deposits`, deposit)

export const retrieveSumOfUserActiveDepositsApi
    = (username) => apiClient.get(`/users/${username}/deposits/total_active_amount`)

export const retrieveMonthlyCumulativeSumOfUserActiveDepositsApi
    = (username, year) => apiClient.get(`/users/${username}/deposits/total_active_cumulative_amount/${year}`)