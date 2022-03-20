import React from 'react'
import { Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
    return (
        <div>
            <Routes>
                <Route path={'/sing-in'} element={<SignIn />} />
                <Route path={'/sing-up'} element={<SignUp />} />

                {/*need fix => */}
                <Route path={'/*'} element={'404'} />
                <Route path={'/profile'} element={''} />
                <Route path={'/reset-password'} element={''} />
                <Route path={'/new-password'} element={''} />
                <Route path={'/test-page'} element={''} />
            </Routes>
        </div>
    )
}

export default App
