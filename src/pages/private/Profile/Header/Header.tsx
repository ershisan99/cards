import React from 'react'
import { useNavigate } from 'react-router'
import Button from '../../../../components/UI/Button'
import { RouteNames } from '../../../../routes'
import { userActions, userThunks } from '../../../../state/slices/UserSlice'
import { useActions } from '../../../../utils/helpers'
import Tabs from './Tabs/Tabs'

type HeaderPropsType = {
    tabs: boolean
    onTabClickHandler: (value: boolean) => void
}

const Header: React.FC<HeaderPropsType> = ({ onTabClickHandler, tabs }) => {
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
                    <Tabs tabs={tabs} onTabClickHandler={onTabClickHandler} />
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
export default Header
