import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../../../components/UI/Button'
import CardModal from '../../../components/UI/CardChangeModal'
import CardsSlider from '../../../components/UI/CardsSlider'
import Input from '../../../components/UI/Input'
import Table from '../../../components/UI/PacksTable'
import { Pagination } from '../../../components/UI/Pagination'
import search from '../../../components/UI/Search'
import Search from '../../../components/UI/Search'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../../state/slices/packsSlice'
import { selectUser } from '../../../state/slices/UserSlice'

import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'

const Packs = () => {
    const { getPacks, addPack, updatedPackTitle, updatedSearch } = useActions({
        ...packsThunks,
        ...packsActions,
    })

    const { cardsPackName, page, pageCount, minCardsCount, maxCardsCount } =
        useAppSelector(selectPacks)
    const { user } = useAppSelector(selectUser)
    const [searchParams, setSearchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const searchValue = searchParams.get('search')
    const [addCardPack, setAddCardPack] = useState<boolean>(false)
    const onCardPackHandler = () => setAddCardPack(!addCardPack)

    const addCardPackHandler = useCallback((title: string) => {
        addPack({ cardsPack: { name: title } })
        setAddCardPack(false)
        updatedPackTitle({ cardsPackName: '' })
    }, [])

    const onInputChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            updatedPackTitle({ cardsPackName: e.currentTarget.value })
        },
        []
    )
    const resetSearch = () => {
        delete searchParamsObject.search
        setSearchParams({ ...searchParamsObject })
        updatedSearch({ search: '' })
    }
    const setSearch = (search: string) =>
        setSearchParams({ ...searchParamsObject, search })
    const searchParamsObject = Object.fromEntries(searchParams)
    const searchHandler = (value: string) => {
        if (value) setSearch(value)
        else resetSearch()
    }
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
                <CardModal
                    isOpen={addCardPack}
                    setIsOpen={onCardPackHandler}
                    title={'Add new pack'}
                >
                    <Input
                        alias={'Name pack'}
                        className="my-6"
                        onChange={(e) => onInputChangeHandler(e)}
                    >
                        Name pack
                    </Input>
                    <div className="my-4 flex justify-between">
                        <Button
                            className="w-1/3"
                            color={'secondary'}
                            onClick={onCardPackHandler}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-1/3"
                            color={'primary'}
                            onClick={() => addCardPackHandler(cardsPackName)}
                        >
                            Save
                        </Button>
                    </div>
                </CardModal>

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
                        <Search
                            resetSearch={resetSearch}
                            searchHandler={searchHandler}
                            value={searchValue || ''}
                        />
                        <Button
                            className="ml-6 w-48 text-sm"
                            color={'primary'}
                            onClick={onCardPackHandler}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <Table />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default Packs
