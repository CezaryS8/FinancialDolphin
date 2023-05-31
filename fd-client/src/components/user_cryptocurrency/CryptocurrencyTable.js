import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CryptocurrencyTable() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        setCryptocurrencies(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map(crypto => (
            <tr key={crypto.id}>
              <td>{crypto.id}</td>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
