import React, { FC, useEffect } from 'react'
import {
    cardsPackThunks,
    selectCardsPack,
} from '../../../../state/slices/cardsPackSlice'
import { selectUser } from '../../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../../utils/helpers'
import CardsSlider from './CardsSlider/CardsSlider'
import { Pagination } from './Pagination/Pagination'
import Search from './Search/Search'
import Table from './Table/Table'
import UserProfile from './UserProfile/UserProfile'

const Profile: FC = () => {
    const { maxCardsCount, minCardsCount } = useAppSelector(selectCardsPack)
    const { user } = useAppSelector(selectUser)
    const { getCardsPack } = useActions(cardsPackThunks)

    useEffect(() => {
        getCardsPack({ user_id: user._id })
    }, [])

    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <div className="w-64 bg-light">
                    <UserProfile
                        username={'Ivan Ivanov'}
                        work={'Front-end developer'}
                    />
                    <CardsSlider
                        minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                    />
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 font-poppins text-xl font-semibold">
                        My pack list
                    </h2>
                    <Search />
                    <Table />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}
export default Profile
