import React, { memo, useCallback, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../routes'
import { selectUser, userThunks } from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import Layout from '../UI/Layout'
import { Spinner } from '../UI/Spinner'
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
import { selectSignIn } from '../../state/slices/signInSlice'

const AppRouter = memo(() => {
    console.log('AppRouter render')

    const { getMe } = useActions(userThunks)
    const { isLoading } = useAppSelector(selectUser)
    const { error, errorMessageNotification } = useAppSelector(selectSignIn)

    useEffect(() => {
        getMe({})
    }, [])

    const notify = useCallback((message: string) => {
        toast.error(`⚠️ ${message}`, {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
        })
    }, [])

    useEffect(() => {
        if (error) {
            console.log('call! ' + error)
            notify(errorMessageNotification)
        }
    }, [error, errorMessageNotification])

    return isLoading ? (
        <Spinner
            isLoading={true}
            className={
                'flex h-screen w-screen items-center justify-center bg-gradient'
            }
            size={'300px'}
        />
    ) : (
        <Layout>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
})

export default AppRouter
