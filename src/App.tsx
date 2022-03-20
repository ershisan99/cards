import React from 'react'
import { Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<SignIn />} />
                <Route path={'/sing-up'} element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default App
