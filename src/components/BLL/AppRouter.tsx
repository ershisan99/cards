import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../routes'
import { selectUser, userThunks } from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import Layout from '../UI/Layout'
import Preloader from '../UI/Preloader'

const AppRouter = () => {
    const { getMe } = useActions(userThunks)
    const { isLoading } = useAppSelector(selectUser)
    useEffect(() => {
        getMe({})
    }, [])
    return isLoading ? (
        <div className="mt-24">
            <Preloader />
        </div>
    ) : (
        <Layout>
            <Routes>
                {routes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                    />
                ))}
            </Routes>
        </Layout>
    )
}

export default AppRouter
