import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { selectUser } from '../state/slices/UserSlice'
import { useAppSelector } from '../utils/helpers'

const AppRouter = () => {
    const { isAuth } = useAppSelector(selectUser)
    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={route.component}
                    key={route.path}
                />
            ))}
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={route.component}
                    key={route.path}
                />
            ))}
        </Routes>
    )
}

export default AppRouter
