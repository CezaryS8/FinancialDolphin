import { useEffect, useMemo, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { retrieveAllUserCryptocurrenciesForUsernameApi, deleteUserCryptocurrencyApi } from "../api/UserCryptocurrencyApiService"
import { useAuth } from "../security/AuthContext"
import { Box } from "@mui/material"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CryptocurrencyTable from "./CryptocurrencyTable"

function UserCryptocurrenciesComponent() {

    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    const [userCryptocurrencies, setUserCryptocurrencies] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => refreshUserCryptocurrencies(), [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'name',
            },
            {
                accessorKey: 'openingDate',
                header: 'openingDate',
            },
            {
                accessorKey: 'amount',
                header: 'amount',
            },
            {
                accessorKey: 'currencyId',
                header: 'currencyId',
            },
        ],
        [],
    );

    function refreshUserCryptocurrencies() {
        retrieveAllUserCryptocurrenciesForUsernameApi(username)
            .then(response => {
                setUserCryptocurrencies(response.data)
            }

            )
            .catch(error => console.log(error))
    }

    function handleDelete(id) {
        deleteUserCryptocurrencyApi(username, id)
            .then(() => {
                setMessage(`Delete of cryptocurrency with id = ${id} successful`)
                refreshUserCryptocurrencies()
            })
            .catch(error => console.log(error))
    }

    function addNewUserCryptocurrency() {
        navigate(`/cryptocurrency/-1`)
    }

    return (
        <>
            <Box height={100} />
            
            <div className="container">
                {/* <p></p> */}
                <div className="row">
                    <div className="col-6">
                        <h1 className="text-start">Total cryptocurrencies: {userCryptocurrencies.length}</h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <Fab className="addNewButton" color="primary" aria-label="add">
                            <AddIcon onClick={addNewUserCryptocurrency} />
                        </Fab>
                    </div>
                </div>

                <hr></hr>

                {message && <div className="alert alert-warning">{message}</div>}

                <div className="row ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>opening date</th>
                                <th>amount</th>
                                <th>currencyId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userCryptocurrencies.map(
                                    userCryptocurrency => (
                                        <tr key={userCryptocurrency.id}>
                                            <td>{userCryptocurrency.name}</td>
                                            <td>{userCryptocurrency.openingDate}</td>
                                            <td>{userCryptocurrency.amount}</td>
                                            <td>{userCryptocurrency.currencyId}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>

                    </table>
                </div>


                <div className="row">
                    <CryptocurrencyTable />
                    {/* <CoinListComponent ownCoinsSymbols={userCryptocurrencies.map(cryptocurrency=>cryptocurrency.name)}></CoinListComponent> */}
                </div>

            </div>

        </>
    )
}

export default UserCryptocurrenciesComponent