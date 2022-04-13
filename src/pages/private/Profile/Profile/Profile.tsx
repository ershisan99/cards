import React, { FC, useCallback, useEffect } from 'react'
import CardsSlider from './CardsSlider/CardsSlider'
import { Pagination } from './Pagination/Pagination'
import Search from './Search/Search'
import Table from './Table/Table'
import UserProfile from './UserProfile/UserProfile'
import { useDispatch } from 'react-redux'
import {
    getCardsPack,
    selectCardsPack,
} from '../../../../state/slices/cardsPackSlice'
import { useAppSelector } from '../../../../utils/helpers'

const Profile: FC = () => {
    const dispatch = useDispatch()
    const {
        cardPacks,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount,
    } = useAppSelector(selectCardsPack)

    useEffect(() => {
        dispatch(getCardsPack({}))
    }, [])

    const onPageChanged = useCallback((pageNumber: number) => {
        dispatch(getCardsPack({ page: pageNumber, pageCount }))
    }, [])

    const onSelectChange = useCallback((pageCount: number) => {
        dispatch(getCardsPack({ pageCount }))
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
                    <Table cardPacks={cardPacks} />
                    <Pagination
                        currentPage={page}
                        pageSize={pageCount}
                        portionSize={pageCount}
                        cardPacksTotalCount={cardPacksTotalCount}
                        onPageChanged={onPageChanged}
                        onSelectChange={onSelectChange}
                    />
                </div>
            </div>
        </div>
    )
}
export default Profile
