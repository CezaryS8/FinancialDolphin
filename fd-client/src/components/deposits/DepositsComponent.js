import { useEffect, useMemo, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { retrieveAllDepositsForUsernameApi, deleteDepositApi } from "../api/DepositApiService"
import { useAuth } from "../security/AuthContext"
import { Box } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import './Deposits.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DepositMenuButton from './DepositMenuButton'
import ExampleChartComponent from "./ExampleChartComponent"
import SmallCardComponent from "./SmallCardComponent"
import SmallCardWithChooseDateComponent from "./SmallCardWithChooseDateComponent"

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
        let start = new Date(openingDate)
        let end = new Date(maturityDate)
        let today = new Date();

        let q = Math.abs(today - start);
        let d = Math.abs(end - start);
        if (end - today < 0)
            return 100;
        return Math.round((q / d) * 100);
    }

    function calculateTotalAmountOfActiveDeposit() {
        let today = new Date();
        const activeDeposits = deposits.filter(deposit => (today >= new Date(deposit.openingDate) && today < new Date(deposit.maturityDate)))
        const activeDepositsSum = activeDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);
        return activeDepositsSum;
    }

    function handleChangeDatePicker(date) {
        let today = new Date();
        const depositsInRange = deposits.filter(deposit => (new Date(deposit.maturityDate) <= today && new Date(deposit.maturityDate) >= new Date(date)));
        const depositsInRangeSum = depositsInRange.reduce((sum, deposit) => sum + (deposit.amount * deposit.interest / 100), 0);

        return depositsInRangeSum;
    }

    return (
        <>
            <Box height={100} />
            <div className="container">
                <p></p>
                <div className="row">
                    <div className="col-6">
                        <h1 className="text-start">Total deposits: {deposits.length}</h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <Fab className="addNewButton" color="primary" aria-label="add">
                            <AddIcon onClick={addNewDeposit} />
                        </Fab>
                    </div>
                </div>

                <hr></hr>

                {message && <div className="alert alert-warning">{message}</div>}

                <div className="row">
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
                                        </tr>
                                    )
                                )
                            }
                        </tbody>

                    </table>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <ExampleChartComponent deposits={deposits}></ExampleChartComponent>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <SmallCardComponent text="Total value of active deposits" amount={calculateTotalAmountOfActiveDeposit()}></SmallCardComponent>
                            </div>
                            <div className="col-md-12">
                                <SmallCardWithChooseDateComponent text="Interest from" onChangeDatePicker={handleChangeDatePicker}></SmallCardWithChooseDateComponent>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default DepositsComponent