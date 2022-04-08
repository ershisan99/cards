import { useNavigate } from 'react-router'
import { RouteNames } from '../../../../routes'
import { userThunks } from '../../../../state/slices/UserSlice'
import { useActions } from '../../../../utils/helpers'
import Tabs from './Tabs/Tabs'
import Button from '../../../../components/UI/Button'
import React from 'react'

type HeaderPropsType = {
    tabs: boolean
    onTabClickHandler: (value: boolean) => void
}

const Header: React.FC<HeaderPropsType> = ({ onTabClickHandler, tabs }) => {
    const { signOut } = useActions(userThunks)
    const navigate = useNavigate()
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
                        onClick={() =>
                            signOut({}).then(() => navigate(RouteNames.SIGN_IN))
                        }
                    >
                        Exit
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Header
