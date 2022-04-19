import React, { ChangeEvent, useCallback, useState } from 'react'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../state/slices/packsSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import Button from './Button'
import CardModal from './CardChangeModal'
import Input from './Input'

const AddPackModal = () => {
    const { cardsPackName } = useAppSelector(selectPacks)

    const { addPack, updatedPackTitle } = useActions({
        ...packsThunks,
        ...packsActions,
    })
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
    return (
        <div>
            <Button
                className="ml-6 w-48 text-sm"
                color={'primary'}
                onClick={onCardPackHandler}
            >
                Add new pack
            </Button>
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
        </div>
    )
}

export default AddPackModal
