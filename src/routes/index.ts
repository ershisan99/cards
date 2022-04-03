import React from 'react'
import ResetPassword from '../pages/ResetPassword'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

export interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RouteNames {
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    RESET_PASSWORD = '/reset-password',
    PROFILE = '/profile',
}

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.SIGN_IN,
        component: SignIn,
    },
    {
        path: RouteNames.SIGN_UP,
        component: SignUp,
    },
    {
        path: RouteNames.RESET_PASSWORD,
        component: ResetPassword,
    },
]
export const privateRoutes: IRoute[] = []
