import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Pagination } from '../../../components/UI/Pagination'
import Search from '../../../components/UI/Search'
import {
    cardsActions,
    cardsThunks,
    selectCards,
} from '../../../state/slices/cardsSlice'
import { selectUser } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'
import AddCardModal from './AddCardModal'
import CardsTable from './CardsTable'

const CardsList = () => {
    const { updatedPage, updatedPageCount } = useActions(cardsActions)
    const { page, pageCount, cardsTotalCount, packUserId } =
        useAppSelector(selectCards)
    const { user } = useAppSelector(selectUser)
    const onPageChange = (page: number) => {
        updatedPage({ page })
    }
    const onItemsPerPageChange = (pageCount: number) => {
        updatedPageCount({ pageCount })
    }

    const { id: cardsPack_id } = useParams()
    const { getCards, updatedSearch } = useActions({
        ...cardsThunks,
        ...cardsActions,
    })
    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get('search')
    const debouncedState = useDebounce(searchValue, 1500)
    useEffect(() => {
        updatedSearch({ search: debouncedState || '' })
    }, [debouncedState])
    useEffect(() => {
        cardsPack_id && getCards({ cardsPack_id })
    }, [page, pageCount, debouncedState])
    return (
        <>
            <div className="h-full py-6">
                <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                    <div className="w-full bg-white px-12 py-6">
                        <h2 className="mb-6 font-poppins text-xl font-semibold">
                            {'Pack Name'}
                        </h2>
                        <div className="flex justify-between">
                            <Search />
                            {packUserId === user!._id && <AddCardModal />}
                        </div>
                        <CardsTable />
                        <Pagination
                            totalItemsCount={cardsTotalCount}
                            currentPage={page || 1}
                            itemsPerPage={pageCount || 10}
                            onPageChange={onPageChange}
                            onItemsPerPageChange={onItemsPerPageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsList
