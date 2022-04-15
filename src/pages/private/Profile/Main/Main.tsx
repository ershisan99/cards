import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Button from '../../../../components/UI/Button'
import CardModal from '../../../../components/UI/CardChangeModal'
import Input from '../../../../components/UI/Input'
import {
    cardPackActions,
    cardsPackThunks,
    selectCardsPack,
} from '../../../../state/slices/cardsPackSlice'
import {
    useActions,
    useAppSelector,
    useDebounce,
} from '../../../../utils/helpers'
import CardsSlider from '../Profile/CardsSlider/CardsSlider'
import { Pagination } from '../Profile/Pagination/Pagination'
import Search from '../Profile/Search/Search'
import Table from '../Profile/Table/Table'

const Main = () => {
    const { getCardsPack, setCardsPack } = useActions(cardsPackThunks)
    const { page, pageCount, cardsPackName, isPersonalCardsPack } =
        useAppSelector(selectCardsPack)
    const { addCardsPackTitle, setPersonalCardsPack } =
        useActions(cardPackActions)
    const [addCardPack, setAddCardPack] = useState<boolean>(false)

    useEffect(() => {
        if (isPersonalCardsPack !== null) {
            getCardsPack({ page, pageCount })
        }
    }, [isPersonalCardsPack])

    const onCardPackHandler = () => setAddCardPack(!addCardPack)
    const addCardPackHandler = useCallback((title: string) => {
        setCardsPack({ cardsPack: { name: title } })
        setAddCardPack(false)
        addCardsPackTitle({ cardsPackName: '' })
    }, [])
    const onInputChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            addCardsPackTitle({ cardsPackName: e.currentTarget.value })
        },
        []
    )

    // search
    const [searchValue, setSearchValue] = useState<string>('')
    const searchHandler = useCallback(
        (value: string) => {
            setSearchValue(value)
        },
        [searchValue, setSearchValue]
    )
    const debouncedState = useDebounce(searchValue, 300)

    useEffect(() => {
        if (debouncedState) {
            getCardsPack({ packName: debouncedState })
        }
        if (debouncedState === '') {
            getCardsPack({})
        }
    }, [debouncedState])

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
                                    isPersonalCardsPack
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={() =>
                                    setPersonalCardsPack({
                                        isPersonalCardsPack: true,
                                    })
                                }
                            >
                                My
                            </button>
                            <button
                                className={
                                    !isPersonalCardsPack
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={() =>
                                    setPersonalCardsPack({
                                        isPersonalCardsPack: false,
                                    })
                                }
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
                        <Search callback={searchHandler} />
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

export default Main
