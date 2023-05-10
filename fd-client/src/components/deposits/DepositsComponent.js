import { useEffect, useMemo, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllDepositsForUsernameApi, deleteDepositApi } from "../api/DepositApiService"
import { useAuth } from "../security/AuthContext"
import { Box } from "@mui/material"
import SidenavComponent from "../drawer/SidenavComponent"
import DepositsDataTableComponent from "./DepositsDataTableComponent"
import MaterialReactTable from 'material-react-table';

function DepositsComponent() {

    const today = new Date()

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [deposits,setDeposits] = useState([])

    const [message,setMessage] = useState(null)

      //data and fetching state
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    
    useEffect ( () => refreshDeposits(), [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
      ])

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

    function deleteDeposit(id) {
        console.log('clicked ' + id)
        deleteDepositApi(username, id)
        .then(
            () => {
                setMessage(`Delete of deposit with id = ${id} successful`)
                refreshDeposits()
            }
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
        {/* <Box height={100} /> */}
            <div className="container">


                <h1>Your deposits!</h1>

                <MaterialReactTable
                    columns={columns}
                    data={deposits}
                    enableRowSelection
                    getRowId={(row) => row.phoneNumber}
                    initialState={{ showColumnFilters: true }}
                    manualFiltering
                    manualPagination
                    manualSorting
                    muiToolbarAlertBannerProps={
                        isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                            }
                        : undefined
                    }
                    onColumnFiltersChange={setColumnFilters}
                    onGlobalFilterChange={setGlobalFilter}
                    onPaginationChange={setPagination}
                    onSortingChange={setSorting}
                    rowCount={rowCount}
                    state={{
                        columnFilters,
                        globalFilter,
                        isLoading,
                        pagination,
                        showAlertBanner: isError,
                        showProgressBars: isRefetching,
                        sorting,
                    }}
                />
                
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