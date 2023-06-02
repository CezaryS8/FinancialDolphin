import { apiClient } from './ApiClient'
// https://www.coingecko.com/pl/api/documentation

export const retrieveCoinList = (currency) => 
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

export const retrieveCoinSymbolList = () =>
    `https://api.coingecko.com/api/v3/coins/list`

export const retrieveCoin = (coinSymbol) => 
    `https://api.coingecko.com/api/v3/coins/${coinSymbol}`

export const retrieveAllCryptocurrenciesApi = () =>
    apiClient.get(`/cryptocurrencies`)
