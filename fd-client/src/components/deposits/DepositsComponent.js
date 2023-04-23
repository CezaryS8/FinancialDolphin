import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllDepositsForUsernameApi, deleteDepositApi } from "../api/DepositApiService"
import { useAuth } from "../security/AuthContext"
import { Box } from "@mui/material"

function DepositsComponent() {

    const today = new Date()

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [deposits,setDeposits] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshDeposits(), [])

    function refreshDeposits() {
        
        retrieveAllDepositsForUsernameApi(username)
        .then(response => {
            setDeposits(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteDeposit(id) {
        console.log('clicked ' + id)
        deleteDepositApi(username, id)
        .then(

            () => {
                setMessage(`Delete of deposit with id = ${id} successful`)
                refreshDeposits()
            }
            //1: Display message
            //2: Update Todos list
        )
        .catch(error => console.log(error))
    }

    function updateDeposit(id) {
        console.log('clicked ' + id)
        navigate(`/deposit/${id}`)
    }

    function addNewDeposit() {
        navigate(`/deposit/-1`)
    }

    return (
        <>
        <Box height={100} />
            <div className="container">
                <h1>Your deposits!</h1>
                
                {message && <div className="alert alert-warning">{message}</div>}
                
                <div>
                    <table className="table">
                        <thead>
                                <tr>
                                    <th>name</th>
                                    <th>interest</th>
                                    <th>amount</th>
                                    {/* <th>Is Done?</th>
                                    <th>Target Date</th>
                                    <th>Delete</th>
                                    <th>Update</th> */}
                                </tr>
                        </thead>
                        <tbody>
                        {
                            deposits.map(
                                deposit => (
                                    <tr key={deposit.id}>
                                        <td>{deposit.name}</td>
                                        <td>{deposit.interest}%</td>
                                        <td>{deposit.amount} zł</td>
                                        {/* <td>{deposit.targetDate.toDateString()}</td> */}
                                        {/* <td>{deposit.targetDate.toString()}</td> */}
                                        <td> <button className="btn btn-warning" 
                                                        onClick={() => deleteDeposit(deposit.id)}>Delete</button> </td>
                                        <td> <button className="btn btn-success" 
                                                        onClick={() => updateDeposit(deposit.id)}>Update</button> </td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>

                    </table>
                </div>
                <div className="btn btn-success m-5" onClick={addNewDeposit}>Add New Deposit</div>
            </div>
        </>
    )
}

export default DepositsComponent