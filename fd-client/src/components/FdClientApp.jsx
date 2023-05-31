import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LogoutComponent from './logout/LogoutComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './welcome/WelcomeComponent'
import AuthProvider from './security/AuthContext'
import DepositsComponent from './deposits/DepositsComponent'
import DepositComponent from './deposits/DepositComponent'
import SidenavComponent from './drawer/SidenavComponent'
import SignInSide from './login/SignInSide'
import SignUpSide from './login/SignUpSide'
import { useAuth } from './security/AuthContext'
import UserCryptocurrenciesComponent from './user_cryptocurrency/UserCryptocurrenciesComponent'
import UserCryptocurrencyComponent from './user_cryptocurrency/UserCryptocurrencyComponent'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()

    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function FdClientApp() {
    return (
        <div className="FdClientApp">
            <AuthProvider>
                <BrowserRouter>
                    <SidenavComponent>
                        <Routes>
                            <Route path='/' element={<SignInSide />} />
                            <Route path='/login' element={<SignInSide />} />
                            <Route path='/register' element={<SignUpSide />} />

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

                            <Route path='/cryptocurrencies' element={
                                <AuthenticatedRoute>
                                    <UserCryptocurrenciesComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='/cryptocurrency/:id' element={
                                <AuthenticatedRoute>
                                    <UserCryptocurrencyComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='*' element={<ErrorComponent />} />

                        </Routes>
                    </SidenavComponent>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
