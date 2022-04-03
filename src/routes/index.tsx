import React from 'react'
import { Navigate } from 'react-router-dom'
import RequireAuth from '../components/BLL/RequireAuth'
import Profile from '../pages/private/Profile/Profile/Profile'
import NewPassword from '../pages/public/NewPassword'
import ResetPassword from '../pages/public/ResetPassword'
import SignIn from '../pages/public/SignIn'
import SignUp from '../pages/public/SignUp'

export interface IRoute {
    path: string
    component: JSX.Element
}

export enum RouteNames {
    START_PAGE = '/',
    NOT_FOUND = '/*',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    RESET_PASSWORD = '/reset-password',
    NEW_PASSWORD = '/set-new-password/:token',
    PROFILE = '/profile',
}

export const routes: IRoute[] = [
    {
        path: RouteNames.START_PAGE,
        component: <Navigate to={RouteNames.PROFILE} />,
    },
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

    //require auth below
    {
        path: RouteNames.PROFILE,
        component: (
            <RequireAuth>
                <Profile />
            </RequireAuth>
        ),
    },
]
