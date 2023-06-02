import React, { useState, useEffect } from 'react';
import { retrieveAllCryptocurrenciesApi } from '../api/CryptocurrencyApiService';
import { Avatar } from '@mui/material';

export default function CryptocurrencyTable() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  function refreshDeposits() {
    retrieveAllCryptocurrenciesApi()
      .then(response => {
        debugger
        setCryptocurrencies(response.data);
      })
      .catch(error => console.log('Error fetching cryptocurrencies:', error))
  }
  useEffect(() => {
    refreshDeposits();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Symbol</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map(crypto => (
            <tr key={crypto.id}>
              <td><Avatar alt={crypto.id} src={crypto.image} /></td>
              <td>{crypto.id}</td>
              <td>{crypto.symbol}</td>
              <td>{crypto.currentPrice} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
