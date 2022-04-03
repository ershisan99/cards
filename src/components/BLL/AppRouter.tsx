import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../../routes'
import { selectUser, userThunks } from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'

const AppRouter = () => {
    const { GetMe } = useActions(userThunks)
    const { isAuth } = useAppSelector(selectUser)
    useEffect(() => {
        GetMe({})
    }, [])
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
