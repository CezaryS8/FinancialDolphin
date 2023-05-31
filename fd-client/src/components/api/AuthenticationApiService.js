import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService
    = (email, password) => 
        apiClient.post(`/auth/authenticate`,{email,password})

export const createUserApi
    = (firstname, lastname, email, password) =>
        apiClient.post(`/auth/register`, {firstname, lastname, email, password})