import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { retrieveUserCryptocurrencyApi, updateUserCryptocurrencyApi, createUserCryptocurrencyApi } from '../api/UserCryptocurrencyApiService'
import { useAuth } from '../security/AuthContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import moment from 'moment'
import { Box } from '@mui/material'


export default function UserCryptocurrencyComponent() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [openingDate, setOpeningDate] = useState('')
    const [amount, setAmount] = useState('')
    const [currencyId, setCurrencyId] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()

    const username = authContext.username

    useEffect(
        () => retrieveUserCryptocurrencies(),
        [id]
    )

    function retrieveUserCryptocurrencies() {
        if (id != -1) {
            retrieveUserCryptocurrencyApi(username, id)
                .then(response => {
                    setName(response.data.name)
                    setOpeningDate(response.data.openingDate)
                    setAmount(response.data.amount)
                    setCurrencyId(response.data.currencyId)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        debugger
        console.log(values)

        const userCryptocurrency = {
            id: id,
            username: username,
            name: values.name,
            openingDate: values.openingDate,
            amount: values.amount,
            currencyId: values.currencyId,
        }

        console.log(userCryptocurrency)

        if (id == -1) {
            createUserCryptocurrencyApi(username, userCryptocurrency)
                .then(response => {
                    navigate('/cryptocurrencies')
                })
                .catch(error => console.log(error))

        } else {
            updateUserCryptocurrencyApi(username, id, userCryptocurrency)
                .then(response => {
                    navigate('/cryptocurrencies')
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }
        debugger
        if (values.name.length < 5) {
            errors.name = 'Enter atleast 5 characters'
        }

        if (values.openingDate == null || values.openingDate == '' || !moment(values.openingDate).isValid()) {
            errors.openingDate = 'Enter correct opening date'
        }

        console.log(values)
        return errors
    }

    return (
        <>
            <Box height={100} />
            <div className="container">
                <h1>Enter Cryptocurrency Details </h1>
                <div>
                    <Formik initialValues={{ name, openingDate, amount, currencyId }}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="alert alert-warning"
                                    />

                                    <ErrorMessage
                                        name="openingDate"
                                        component="div"
                                        className="alert alert-warning"
                                    />

                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field type="text" className="form-control" name="name" />
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