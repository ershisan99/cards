import React from 'react'
import { Navigate } from 'react-router-dom'
import { RouteNames } from '../../routes'
import { selectUser } from '../../state/slices/UserSlice'
import { useAppSelector } from '../../utils/helpers'
import Layout from '../UI/Layout'

const RequireAuth: React.FC = ({ children }) => {
    const { isAuth } = useAppSelector(selectUser)
    if (!isAuth) {
        return <Navigate to={RouteNames.SIGN_IN} />
    }
    return <Layout>{children}</Layout>
}

export default RequireAuth
