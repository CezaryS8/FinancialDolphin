import { Box } from '@mui/material'

function ErrorComponent() {
    return (
        <>
        <Box height={100} />
            <div className="ErrorComponent">
                <h1>Something wrong!</h1>
                <div>
                    Apologies for the 404.
                </div>
            </div>
        </>
    )
}

export default ErrorComponent