import React, { FC, useEffect } from 'react'
import {
    cardPackActions,
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
    const { user } = useAppSelector(selectUser)
    const { getCardsPack } = useActions(cardsPackThunks)
    const { setPersonalCardsPack } = useActions(cardPackActions)
    const { page, pageCount, minCardsCount, maxCardsCount } =
        useAppSelector(selectCardsPack)
    useEffect(() => {
        setPersonalCardsPack({ isPersonalCardsPack: true })
        getCardsPack({ user_id: user._id })
    }, [page, pageCount, minCardsCount, maxCardsCount])
    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <div className="w-64 bg-light">
                    <UserProfile
                        username={user.name}
                        work={'Front-end developer'}
                    />
                    <CardsSlider />
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 font-poppins text-xl font-semibold">
                        My card packs
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
