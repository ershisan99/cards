import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
import React, { useCallback, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../routes'
import { selectUser, userThunks } from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import { Spinner } from '../UI/Spinner'

const AppRouter = () => {
    const { getMe } = useActions(userThunks)
    const { user, isLoading } = useAppSelector(selectUser)
    const { error, errorMessageNotification, info, infoMessageNotification } =
        useAppSelector(selectUser)

    useEffect(() => {
        if (!user) {
            getMe({})
        }
    }, [])

    const notify = useCallback(
        (message: string, typeNotification: 'info' | 'error') => {
            if (typeNotification === 'error') {
                toast.error(`⚠️ ${message}`, {
                    position: 'bottom-left',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    bodyStyle: {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        fontSize: '20px',
                        lineHeight: '20px',
                        minHeight: '30px',
                    },
                })
            }
            if (typeNotification === 'info') {
                toast(`✅️ ${message}`, {
                    position: 'bottom-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    bodyStyle: {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        fontSize: '20px',
                        lineHeight: '20px',
                        minHeight: '30px',
                    },
                })
            }
        },
        []
    )

    useEffect(() => {
        if (info) {
            notify(infoMessageNotification!, 'info')
        }
        if (error) {
            notify(errorMessageNotification!, 'error')
        }
    }, [error, errorMessageNotification, info, infoMessageNotification])

    return isLoading ? (
        <Spinner
            className={
                'flex h-screen w-screen items-center justify-center bg-gradient'
            }
            size={'300px'}
        />
    ) : (
        <>
            <ToastContainer
                position="bottom-center"
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
        </>
    )
}

export default AppRouter
