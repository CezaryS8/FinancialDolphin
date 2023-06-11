import {useParams, Link} from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPathVariable } from '../api/HelloWorldApiService'
import { useAuth } from '../security/AuthContext'
import { Box } from '@mui/material'


function WelcomeComponent() {

    const {username } = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){
        console.log('called')
              
        retrieveHelloWorldPathVariable('Ranga', authContext.token)
            .then( (response) => successfulResponse(response) )
            .catch ( (error) => errorResponse(error) )
            .finally ( () => console.log('cleanup') )

    }

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
                <div>
                    Manage your finances - <Link to="/deposits">Go here</Link>
                </div>
                <div className="text-info">{message}</div>
            </div>
        </>
    )
}

export default WelcomeComponent