import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { retrieveDepositApi, updateDepositApi, createDepositApi } from '../api/DepositApiService'
import { useAuth } from '../security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'
import { Box } from '@mui/material'


export default function DepositComponent() {
    
    const {id} = useParams()
    
    const[name, setName] = useState('')
    const[interest, setInterest] = useState('')
    const[bank, setBank] = useState('')
    const[maturityDate, setMaturityDate] = useState('')
    const[openingDate, setOpeningDate] = useState('')
    const[amount, setAmount] = useState('')
    const[profit, setProfit] = useState('')
    const[tax, setTax] = useState('')
    const[isActive, setIsActive] = useState('')
    const[interestType, setInterestType] = useState('')
    const[currencyId, setCurrencyId] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()
    
    const username = authContext.username
    
    useEffect(
        () => retrieveDeposits(),
        [id]
        )

    function retrieveDeposits(){
        if(id != -1) {
            retrieveDepositApi(username, id)
            .then(response => {
                setName(response.data.name)
                setInterest(response.data.interest)
                setBank(response.data.bank)
                setMaturityDate(response.data.maturityDate)
                setOpeningDate(response.data.openingDate)
                setAmount(response.data.amount)
                setProfit(response.data.profit)
                setTax(response.data.tax)
                setIsActive(response.data.isActive)
                setInterestType(response.data.interestType)
                setCurrencyId(response.data.currencyId)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        
        const deposit = {
            id: id,
            username: username,
            name: values.name,
            interest: values.interest,
            bank: values.bank,
            maturityDate: values.maturityDate,
            openingDate: values.openingDate,
            amount: values.amount,
            profit: values.profit,
            tax: values.tax,
            isActive: true,
            interestType: values.interestType,
            currencyId: values.currencyId,
        }

        console.log(deposit)

        if(id==-1) {
            createDepositApi(username, deposit)
            .then(response => {
                navigate('/deposits')
            })
            .catch(error => console.log(error))
    
        } else {
            updateDepositApi(username, id, deposit)
            .then(response => {
                navigate('/deposits')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.name.length<5) {
            errors.name = 'Enter atleast 5 characters'
        }

        if(values.maturityDate == null || values.maturityDate=='' || !moment(values.maturityDate).isValid()) {
            errors.maturityDate = 'Enter a maturity date'
        }

        console.log(values)
        return errors
    }

    return (
        <>
        <Box height={100} />
            <div className="container">
                <h1>Enter Deposit Details </h1>
                <div>
                    <Formik initialValues={ { name, maturityDate, interest, bank, maturityDate, openingDate, amount, profit, tax, interestType, currencyId } } 
                        enableReinitialize = {true}
                        onSubmit = {onSubmit}
                        validate = {validate}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                    >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage 
                                    name="name"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                
                                <ErrorMessage 
                                    name="maturityDate"
                                    component="div"
                                    className = "alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field type="text" className="form-control" name="name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Interest</label>
                                    <Field type="number" className="form-control" name="interest" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Bank</label>
                                    <Field type="text" className="form-control" name="bank" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Maturity date</label>
                                    <Field type="date" className="form-control" name="maturityDate" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Opening date</label>
                                    <Field type="date" className="form-control" name="openingDate" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Amount</label>
                                    <Field type="number" step="0.01" className="form-control" name="amount" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Profit</label>
                                    <Field type="number" step="0.01" className="form-control" name="profit"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Tax</label>
                                    <Field type="number" step="0.01" className="form-control" name="tax"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Interest Type</label>
                                    <Field type="text" className="form-control" name="interestType" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>currencyId</label>
                                    <Field type="number" className="form-control" name="currencyId" />
                                </fieldset>

                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                    </Formik>
                </div>

            </div>
        </>
    )
}