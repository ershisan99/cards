import React from 'react'
import { Navigate } from 'react-router-dom'
import { RouteNames } from '../../routes'
import { selectUser } from '../../state/slices/UserSlice'
import { useAppSelector } from '../../utils/helpers'

const RequireAuth: React.FC = ({ children }) => {
    const { isAuth } = useAppSelector(selectUser)
    if (!isAuth) {
        return <Navigate to={RouteNames.SIGN_IN} />
    }
    return <>{children}</>
}

export default RequireAuth
