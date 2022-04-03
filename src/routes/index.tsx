import React from 'react'
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
]
export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.PROFILE,
        component: <Profile />,
    },
]
