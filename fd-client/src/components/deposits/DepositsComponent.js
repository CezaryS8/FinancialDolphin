import { useEffect, useMemo, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { retrieveAllDepositsForUsernameApi, deleteDepositApi } from "../api/DepositApiService"
import { useAuth } from "../security/AuthContext"
import { Box } from "@mui/material"
import SidenavComponent from "../drawer/SidenavComponent"
import DepositsDataTableComponent from "./DepositsDataTableComponent"
import MaterialReactTable from 'material-react-table';
import CircularProgress from '@mui/material/CircularProgress';
import { LocalDate, ChronoUnit } from 'js-joda';
import './Deposits.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DepositMenuButton from './DepositMenuButton'

function DepositsComponent() {

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    const [deposits, setDeposits] = useState([])

    const [message, setMessage] = useState(null)

    useEffect(() => refreshDeposits(), [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'name',
            },
            {
                accessorKey: 'interest',
                header: 'interest',
            },
            {
                accessorKey: 'bank',
                header: 'bank',
            },
            {
                accessorKey: 'maturityDate',
                header: 'maturityDate',
            },
            {
                accessorKey: 'amount',
                header: 'amount',
            },
        ],
        [],
    );

    function refreshDeposits() {

        retrieveAllDepositsForUsernameApi(username)
            .then(response => {
                setDeposits(response.data)
            }

            )
            .catch(error => console.log(error))
    }

    function handleDelete(id) {
        deleteDepositApi(username, id)
            .then(() => {
                setMessage(`Delete of deposit with id = ${id} successful`)
                refreshDeposits()
            })
            .catch(error => console.log(error))
    }

    function addNewDeposit() {
        navigate(`/deposit/-1`)
    }

    function calculateProgress(openingDate, maturityDate) {
        var start = new Date(openingDate)
        var end = new Date(maturityDate)
        var today = new Date();

        var q = Math.abs(today - start);
        var d = Math.abs(end - start);
        if (end - today < 0)
            return 100;
        return Math.round((q / d) * 100);
    }


    return (
        <>
            <Box height={100} />
            <div className="container">
                <p></p>
                <div class="row">
                    <div class="col-6">
                        <h1 class="text-start">Total deposits: {deposits.length}</h1>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <Fab className="addNewButton" color="primary" aria-label="add">
                            <AddIcon onClick={addNewDeposit} />
                        </Fab>
                    </div>
                </div>

                
                <hr></hr>


                {message && <div className="alert alert-warning">{message}</div>}

                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>progress</th>
                                <th>name</th>
                                <th>interest</th>
                                <th>amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                deposits.map(
                                    deposit => (
                                        <tr key={deposit.id}>
                                            <td><CircularProgress variant="determinate" value={calculateProgress(deposit.openingDate, deposit.maturityDate)} /></td>
                                            <td>{deposit.name}</td>
                                            <td>{deposit.interest}%</td>
                                            <td>{deposit.amount} zł</td>
                                            <td><DepositMenuButton id={deposit.id} onDelete={handleDelete}></DepositMenuButton></td>
                                            {/* <td> <button className="btn btn-warning" 
                                                        onClick={() => deleteDeposit(deposit.id)}>Delete</button> </td>
                                        <td> <button className="btn btn-success" 
                                                        onClick={() => updateDeposit(deposit.id)}>Update</button> </td> */}
                                        </tr>
                                    )
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>



        </>
    )
}

export default DepositsComponent