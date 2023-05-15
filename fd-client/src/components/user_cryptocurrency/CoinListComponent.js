import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { retrieveCoinList, retrieveCoinSymbolList } from '../api/CryptocurrencyApiService';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';

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
        // console.log(trendingCoins);
        // console.log(props.ownCoinsSymbols)
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

        // console.log(ownTrendingCoins);
    }

    //  function fetchCoin(coinSymbol) {
    //     axios
    //         .get(retrieveCoin(coinSymbol))
    //         .then(response => setTrendingCoinsSymbols(Array.from(response.data.data)))
    //         .catch(error => console.log(error));
    // };

    function fetchTrendingCoinsSymbols() {
            axios
                .get(retrieveCoinSymbolList(currency))
                .then(response => setTrendingCoinsSymbols(Array.from(response.data.data)))
                .catch(error => console.log(error));

        // console.log(data);
    };

    return (
        <div>
            TODO: SELECT MULI
            {/* <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Coin
                </InputLabel>
                <NativeSelect
                    defaultValue={'bitcoin'}
                    inputProps={{
                        name: 'coin',
                        id: 'uncontrolled-native',
                    }}
                >
                    {
                        trendingCoinsSymbols.map(
                            trendingCoinSymbol => (
                                <option value={trendingCoinSymbol.symbol}>{trendingCoinSymbol.symbol}</option>
                            )
                        )

                    }

                </NativeSelect>
            </FormControl> */}
            Powered by CoinGecko
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