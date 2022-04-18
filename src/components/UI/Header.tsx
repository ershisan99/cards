import React from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import cards from '../../assets/images/cards.svg'
import profileIcon from '../../assets/images/user.svg'
import { RouteNames } from '../../routes'
import {
    selectUser,
    userActions,
    userThunks,
} from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import Button from './Button'

const Header = () => {
    const { signOut } = useActions(userThunks)
    const { setInfo, setInfoMessage, setError, setErrorMessageNotification } =
        useActions(userActions)
    const navigate = useNavigate()

    const signOutHandler = () => {
        signOut({})
            .unwrap()
            .then((res) => {
                setInfoMessage({ message: res.info })
                setInfo({ value: true })
                navigate(RouteNames.SIGN_IN)
            })
            .catch((err) => {
                setErrorMessageNotification({ message: err.message })
                setError({ value: true })
            })
            .finally(() => {
                setError({ value: false })
                setInfo({ value: false })
            })
    }

    return (
        <div className="h-14 w-full bg-pink-50 font-poppins">
            <div className="mx-auto flex h-14 w-4/6 justify-between ">
                <div className="flex grow-0 items-center">
                    <span className="w-40 text-2xl font-semibold text-gray-800">
                        Cards
                    </span>
                </div>
                <div className="flex grow items-center">
                    <Tabs />
                </div>
                <div className="flex items-center">
                    <Button
                        className="rounded px-5 py-1 transition hover:bg-warning hover:text-white"
                        color={'secondary'}
                        onClick={signOutHandler}
                    >
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    )
}

const Tabs = () => {
    const { user } = useAppSelector(selectUser)
    return (
        user && (
            <div className="mx-auto flex h-14 w-80">
                <NavLink
                    to={RouteNames.MAIN}
                    className={({ isActive }) =>
                        isActive ? 'tab-item__active' : 'tab-item'
                    }
                >
                    <img className="ml-4" src={cards} alt="cards icon" />
                    <span className="mx-1.5 text-sm font-thin">Packs list</span>
                </NavLink>

                <NavLink
                    to={`/profile/${user._id}`}
                    className={({ isActive }) =>
                        isActive ? 'tab-item__active' : 'tab-item'
                    }
                >
                    <img className="ml-6" src={profileIcon} alt="user icon" />
                    <span className="mx-1.5 text-sm font-thin">Profile</span>
                </NavLink>
            </div>
        )
    )
}
export default Header
