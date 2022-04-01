import React from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { store } from './state/store'

function App() {
    return (
        <div>
            <Provider store={store}>
                <Routes>
                    <Route path={'/sign-in'} element={<SignIn />} />
                    <Route path={'/sign-up'} element={<SignUp />} />

                    {/* todo: need add component */}
                    <Route path={'/'} element={'home'} />
                    <Route path={'/profile'} element={'profile'} />
                    <Route
                        path={'/reset-password'}
                        element={'reset-password'}
                    />
                    <Route path={'/new-password'} element={'new-password'} />
                    <Route path={'/test-page'} element={'test-page'} />
                    <Route path={'/*'} element={'404'} />
                </Routes>
            </Provider>
        </div>
    )
}

export default App
