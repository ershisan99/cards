import React from 'react'
import { Navigate } from 'react-router-dom'
import RequireAuth from '../components/BLL/RequireAuth'
import CardsList from '../pages/private/CardsList/CardsList'
import Packs from '../pages/private/Packs/Packs'
import Profile from '../pages/private/Profile/Profile'
import NewPassword from '../pages/public/ResetPassword/NewPassword'
import ResetPassword from '../pages/public/ResetPassword/ResetPassword'
import SignIn from '../pages/public/SignIn/SignIn'
import SignUp from '../pages/public/SignUp/SignUp'

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
    PROFILE = '/profile/:userId',
    MAIN = '/main',
    PACK = '/pack/:id',
}

export const routes: IRoute[] = [
    {
        path: RouteNames.START_PAGE,
        component: <Navigate to={RouteNames.MAIN} />,
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
    {
        path: RouteNames.MAIN,
        component: (
            <RequireAuth>
                <Packs />
            </RequireAuth>
        ),
    },
    {
        path: RouteNames.PACK,
        component: (
            <RequireAuth>
                <CardsList />
            </RequireAuth>
        ),
    },
]
