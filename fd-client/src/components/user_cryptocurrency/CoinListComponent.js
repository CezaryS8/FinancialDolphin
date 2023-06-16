import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { retrieveCoinList, retrieveCoinSymbolList } from '../api/CryptocurrencyApiService';

export default function CoinListComponent(props) {
    const [currency, setCurrency] = useState('usd');
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [trendingCoinsSymbols, setTrendingCoinsSymbols] = useState([])
    const [ownTrendingCoinsSymbols, setOwnTrendingCoinsSymbols] = useState([])
    const [ownTrendingCoins, setOwnTrendingCoins] = useState([])

    useEffect(() => {
        fetchTrendingCoinsSymbols();
    }, []);

    useEffect(() => {
        fetchTrendingCoins();
        setOwnTrendingCoinsSymbols(props.ownCoinsSymbols)
        getOnlyOwnCoins();
        console.log(ownTrendingCoinsSymbols);
    }, [currency]);

    function fetchTrendingCoins() {
        axios
            .get(retrieveCoinList(currency))
            .then(response => setTrendingCoins(response.data))
            .catch(error => console.log(error));
    };

    function getOnlyOwnCoins() {
        const data = trendingCoins.filter((coin) => ownTrendingCoinsSymbols.includes(coin.name));
        setOwnTrendingCoins(data);
    }

    function fetchTrendingCoinsSymbols() {
            axios
                .get(retrieveCoinSymbolList(currency))
                .then(response => setTrendingCoinsSymbols(Array.from(response.data.data)))
                .catch(error => console.log(error));

        console.log(trendingCoinsSymbols);
    };

    return (
        <div>
            <ul>
            {
                ownTrendingCoins.map(
                    coin => (
                        <li key={coin.id}>{coin.name} i {coin.id}</li>
                    )
                )
            }
            </ul>
            
        </div>
    );
}