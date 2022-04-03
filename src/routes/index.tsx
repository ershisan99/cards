import React from 'react'
import { Navigate } from 'react-router-dom'
import NewPassword from '../pages/NewPassword'
import Profile from '../pages/Profile/Profile/Profile'
import ResetPassword from '../pages/ResetPassword'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

export interface IRoute {
    path: string
    component: JSX.Element
}

export enum RouteNames {
    START_PAGE = '/',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    RESET_PASSWORD = '/reset-password',
    NEW_PASSWORD = '/new-password',
    PROFILE = '/profile',
}

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.SIGN_IN,
        component: <SignIn />,
    },
    {
        path: RouteNames.SIGN_UP,
        component: <SignUp />,
    },
    {
        path: RouteNames.RESET_PASSWORD,
        component: <ResetPassword />,
    },
    {
        path: RouteNames.NEW_PASSWORD,
        component: <NewPassword />,
    },
    {
        path: RouteNames.START_PAGE,
        component: <Navigate to={RouteNames.SIGN_IN} />,
    },
]
export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.PROFILE,
        component: <Profile />,
    },
    {
        path: RouteNames.START_PAGE,
        component: <Navigate to={RouteNames.PROFILE} />,
    },
]
