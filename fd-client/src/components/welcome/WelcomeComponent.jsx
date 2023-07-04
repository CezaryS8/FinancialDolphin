import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { retrieveHelloWorldPathVariable } from '../api/HelloWorldApiService'
import { useAuth } from '../security/AuthContext'
import { Box } from '@mui/material'
import OverviewCardComponent from './OverviewCardComponent'
import { retrieveMonthlyCumulativeSumOfUserActiveDepositsApi, retrieveSumOfUserActiveDepositsApi } from '../api/DepositApiService'
import { retrieveSumOfUserCryptocurrenciesApi } from '../api/CryptocurrencyApiService'
import OverviewDiversityAreaChartComponent from './OverviewDiversityAreaChartComponent'
import OverviewDiversityPieChartComponent from './OverviewDiversityPieChartComponent'


function WelcomeComponent() {

    const { username } = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    const [sumOfActiveDeposits, setSumOfActiveDeposits] = useState(0)
    const [sumOfCryptocurrencies, setSumOfCryptocurrencies] = useState(0)

    useEffect(() => {
        refreshSumOfDeposits();
        refreshSumOfCryptocurrencies();
        refreshMonthlyCumulativeSumOfDeposits();
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
    function refreshMonthlyCumulativeSumOfDeposits() {
        retrieveMonthlyCumulativeSumOfUserActiveDepositsApi(username, 2023)
            .then(response => {
                // TODO
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }
    function getNamesAndSumsOfInvestements() {
        const data = [
            { name: 'Deposits', value: sumOfActiveDeposits },
            { name: 'Cryptocurrencies', value: sumOfCryptocurrencies }
        ];
        console.log(data);
        return data;
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

                <div className="row m-4">
                    <div className="col-lg-4 col-md-6 p-2">
                        <OverviewCardComponent text="Deposits" amount={sumOfActiveDeposits}></OverviewCardComponent>
                    </div>
                    <div className="col-lg-4 col-md-6 p-2">
                        <OverviewCardComponent text="Cryptocurrencies" amount={sumOfCryptocurrencies}></OverviewCardComponent>
                    </div>
                    <div className="col-lg-4 col-md-12 p-2">
                        <OverviewCardComponent text="???" amount="1000"></OverviewCardComponent>
                    </div>
                </div>
                <div className="row m-4" style={{ height: '50vh' }}>
                    <div className="col-lg-6">
                        <OverviewDiversityPieChartComponent data={getNamesAndSumsOfInvestements()}></OverviewDiversityPieChartComponent>
                    </div>
                    <div className="col-lg-6">
                        <OverviewDiversityAreaChartComponent />
                    </div>

                </div>
               

                <div className="text-info">{message}</div>
            </div>
        </>
    )
}

export default WelcomeComponent