import React from 'react'
import { NavLink } from 'react-router-dom'
import cards from '../../../../../assets/images/cards.svg'
import user from '../../../../../assets/images/user.svg'
import { RouteNames } from '../../../../../routes'
import { cardPackActions } from '../../../../../state/slices/cardsPackSlice'
import { useActions } from '../../../../../utils/helpers'

const Tabs: React.FC = () => {
    const { setPersonalCardsPack, setSearch } = useActions(cardPackActions)
    return (
        <div className="mx-auto flex h-14 w-80">
            <NavLink
                onClick={() => {
                    setPersonalCardsPack({ isPersonalCardsPack: false })
                    setSearch({ search: '' })
                }}
                to={RouteNames.MAIN}
                className={({ isActive }) =>
                    isActive ? 'tab-item__active' : 'tab-item'
                }
            >
                <img className="ml-4" src={cards} alt="cards icon" />
                <span className="mx-1.5 text-sm font-thin">Packs list</span>
            </NavLink>

            <NavLink
                onClick={() => {
                    setPersonalCardsPack({ isPersonalCardsPack: true })
                    setSearch({ search: '' })
                }}
                to={RouteNames.PROFILE}
                className={({ isActive }) =>
                    isActive ? 'tab-item__active' : 'tab-item'
                }
            >
                <img className="ml-6" src={user} alt="user icon" />
                <span className="mx-1.5 text-sm font-thin">Profile</span>
            </NavLink>
        </div>
    )
}

export default Tabs
