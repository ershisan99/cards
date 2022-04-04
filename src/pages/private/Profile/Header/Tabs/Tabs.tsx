import React from 'react'
import { Link } from 'react-router-dom'
import cards from '../../../../../assets/images/cards.svg'
import user from '../../../../../assets/images/user.svg'
import { RouteNames } from '../../../../../routes'

type TabsPropsType = {
    tabs: boolean
    onTabClickHandler: (value: boolean) => void
}

const Tabs: React.FC<TabsPropsType> = ({ onTabClickHandler, tabs }) => {
    const onMainClickHandler = () => {
        onTabClickHandler(false)
    }
    const onProfileClickHandler = () => {
        onTabClickHandler(true)
    }

    return (
        <div className="mx-auto flex h-14 w-80">
            <Link
                to={RouteNames.MAIN}
                className={!tabs ? 'tab-item__active' : 'tab-item'}
                onClick={onMainClickHandler}
            >
                <img className="ml-4" src={cards} alt="cards icon" />
                <span className="mx-1.5 text-sm font-thin">Packs list</span>
            </Link>

            <Link
                to={RouteNames.PROFILE}
                className={tabs ? 'tab-item__active' : 'tab-item'}
                onClick={onProfileClickHandler}
            >
                <img className="ml-6" src={user} alt="user icon" />
                <span className="mx-1.5 text-sm font-thin">Profile</span>
            </Link>
        </div>
    )
}

export default Tabs
