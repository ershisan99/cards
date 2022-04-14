import CardsSlider from '../Profile/CardsSlider/CardsSlider'
import Search from '../Profile/Search/Search'
import Table from '../Profile/Table/Table'
import { Pagination } from '../Profile/Pagination/Pagination'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useActions, useAppSelector } from '../../../../utils/helpers'
import {
    cardPackActions,
    cardsPackThunks,
    selectCardsPack,
} from '../../../../state/slices/cardsPackSlice'
import Button from '../../../../components/UI/Button'
import CardModal from '../../../../components/UI/CardChangeModal'
import Input from '../../../../components/UI/Input'

const Main = () => {
    const { getCardsPack, setCardsPack } = useActions(cardsPackThunks)
    const {
        cardPacks,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount,
        cardsPackName,
        isPersonalCardsPack,
    } = useAppSelector(selectCardsPack)

    const { addCardsPackTitle, getPersonalCardsPack } =
        useActions(cardPackActions)
    const [showModal, setShowModal] = useState<boolean>(false)
    // temporary state
    const [activeButton, setActiveButton] = useState<'all' | 'my'>('all')
    const [showModal, setShowModal] = useState<boolean>(false)

    const changeActiveButton = () => {
        activeButton === 'all' ? setActiveButton('my') : setActiveButton('all')
    }

    useEffect(() => {
        dispatch(getCardsPack({}))
    }, [])

    const onPageChanged = useCallback((pageNumber: number) => {
        dispatch(getCardsPack({ page: pageNumber, pageCount }))
    }, [])

    const onSelectChange = useCallback((pageCount: number) => {
        dispatch(getCardsPack({ pageCount }))
    }, [])

    const onCardPackHandler = () => setShowModal(!showModal)

    const addCardPackHandler = useCallback((title: string) => {
        dispatch(setCardsPack({ cardsPack: { name: title } }))
    }, [])

    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <CardModal
                    isOpen={showModal}
                    setIsOpen={onCardPackHandler}
                    title={'Add new pack'}
                >
                    <Input alias={'Name pack'} className="my-6">
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
                            onClick={() => alert('kek')}
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
                                    activeButton === 'my'
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={changeActiveButton}
                            >
                                My
                            </button>
                            <button
                                className={
                                    activeButton === 'all'
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={changeActiveButton}
                            >
                                All
                            </button>
                        </div>
                    </div>

                    <CardsSlider
                        minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                    />
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 font-poppins text-xl font-semibold">
                        Pack list
                    </h2>
                    <div className="flex justify-between">
                        <Search />
                        <Button
                            className="ml-6 w-48 text-sm"
                            color={'primary'}
                            onClick={onCardPackHandler}
                        >
                            Add new pack
                        </Button>
                    </div>

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

export default Main
