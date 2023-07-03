import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { retrieveHelloWorldPathVariable } from '../api/HelloWorldApiService'
import { useAuth } from '../security/AuthContext'
import { Box } from '@mui/material'
import OverviewCardComponent from './OverviewCardComponent'
import { retrieveSumOfUserActiveDepositsApi } from '../api/DepositApiService'
import { retrieveSumOfUserCryptocurrenciesApi } from '../api/CryptocurrencyApiService'


function WelcomeComponent() {

    const { username } = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    const [sumOfActiveDeposits, setSumOfActiveDeposits] = useState(0)
    const [sumOfCryptocurrencies, setSumOfCryptocurrencies] = useState(0)

    useEffect(() => {
        refreshSumOfDeposits();
        refreshSumOfCryptocurrencies();
    }, [])

    function refreshSumOfDeposits() {
        retrieveSumOfUserActiveDepositsApi(username)
            .then(response => {
                setSumOfActiveDeposits(response.data)
            })
            .catch(error => console.log(error))
    }
    function refreshSumOfCryptocurrencies() {
        retrieveSumOfUserCryptocurrenciesApi(username)
            .then(response => {
                setSumOfCryptocurrencies(response.data)
            })
            .catch(error => console.log(error))
    }


    // function callHelloWorldRestApi() {
    //     console.log('called')

    //     retrieveHelloWorldPathVariable('Ranga', authContext.token)
    //         .then((response) => successfulResponse(response))
    //         .catch((error) => errorResponse(error))
    //         .finally(() => console.log('cleanup'))

    // }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <>
            <Box height={100} />
            <div className="WelcomeComponent">
                <h1>Welcome {username}</h1>

                <div className="row p-4">
                    <div className="col-md-4 p-2">
                        <OverviewCardComponent text="Deposits" amount={sumOfActiveDeposits} ></OverviewCardComponent>
                    </div>
                    <div className="col-md-4 p-2">
                        <OverviewCardComponent text="Cryptocurrencies" amount={sumOfCryptocurrencies}></OverviewCardComponent>
                    </div>
                    <div className="col-md-4 p-2">
                        <OverviewCardComponent text="???" amount="1000"></OverviewCardComponent>
                    </div>
                </div>

                <div>
                    Manage your finances - <Link to="/deposits">Go here</Link>
                </div>
                <div className="text-info">{message}</div>
            </div>
        </>
    )
}

export default WelcomeComponent