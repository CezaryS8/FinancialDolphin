import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './logout/LogoutComponent'
import HeaderComponent from './header/HeaderComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './welcome/WelcomeComponent'
import LoginComponent from './login/LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import DepositsComponent from './deposits/DepositsComponent'
import DepositComponent from './deposits/DepositComponent'
import SidenavComponent from './drawer/SidenavComponent'
import AppBarComponent from './header/HeaderComponent'

// function AuthenticatedRoute({children}) {
//     const authContext = useAuth()
    
//     if(authContext.isAuthenticated)
//         return children

//     return <Navigate to="/" />
// }

export default function FdClientApp() {
    return (
        <div className="FdClientApp">
            <AuthProvider>
                <BrowserRouter>
                {/* <HeaderComponent /> */}

                {/* <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <SidenavComponent />
                    </Grid>
                    <Grid item xs={10}>
                        <Routes />
                    </Grid>
                    </Grid> */}
                    {/* <AppBarComponent /> */}
                    <SidenavComponent />
                    
                    {/* <Routes>
                        
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />
                        
                        <Route path='/deposits' element={
                            <AuthenticatedRoute>
                                <DepositsComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/deposit/:id' element={
                            <AuthenticatedRoute>
                                <DepositComponent /> 
                            </AuthenticatedRoute>
                        } />
                
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='*' element={<ErrorComponent /> } />
                        
                    </Routes>  */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
