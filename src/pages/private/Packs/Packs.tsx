import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AddPackModal from '../../../components/UI/AddPackModal'
import CardsSlider from '../../../components/UI/CardsSlider'
import Table from '../../../components/UI/PacksTable'
import { Pagination } from '../../../components/UI/Pagination'
import Search from '../../../components/UI/Search'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../../state/slices/packsSlice'
import { selectUser } from '../../../state/slices/UserSlice'

import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'

const Packs = () => {
    const { page, pageCount, minCardsCount, maxCardsCount } =
        useAppSelector(selectPacks)
    const { user } = useAppSelector(selectUser)
    const { getPacks, updatedSearch } = useActions({
        ...packsThunks,
        ...packsActions,
    })

    const [searchParams, setSearchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const searchValue = searchParams.get('search')

    const debouncedState = useDebounce(searchValue, 1500)
    useEffect(() => {
        updatedSearch({ search: debouncedState || '' })
    }, [debouncedState])
    useEffect(() => {
        userId ? getPacks({ user_id: userId }) : getPacks({})
    }, [page, pageCount, minCardsCount, maxCardsCount, debouncedState, userId])
    console.log(Object.fromEntries(searchParams))
    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <div className="w-64 bg-light">
                    <div className="p-6">
                        <h3 className="text-base font-semibold">
                            Show packs cards
                        </h3>
                        <div className="mt-2 flex flex-row items-center justify-center p-0">
                            <button
                                className={
                                    userId
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={() =>
                                    setSearchParams({
                                        ...Object.fromEntries(searchParams),
                                        userId: user._id,
                                    })
                                }
                            >
                                My
                            </button>
                            <button
                                className={
                                    !userId
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={() => {
                                    const searchParamsObj =
                                        Object.fromEntries(searchParams)
                                    delete searchParamsObj.userId
                                    setSearchParams({
                                        ...searchParamsObj,
                                    })
                                }}
                            >
                                All
                            </button>
                        </div>
                    </div>
                    <CardsSlider />
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 font-poppins text-xl font-semibold">
                        Pack list
                    </h2>
                    <div className="flex justify-between">
                        <Search />
                        <AddPackModal />
                    </div>
                    <Table />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default Packs
