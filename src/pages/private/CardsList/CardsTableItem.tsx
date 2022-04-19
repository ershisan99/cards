import React, { useCallback, useState } from 'react'
import Button from '../../../components/UI/Button'
import CardModal from '../../../components/UI/CardChangeModal'
import { selectCards } from '../../../state/slices/cardsSlice'
import { packsThunks } from '../../../state/slices/packsSlice'
import { selectUser } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'

type TabItemType = {
    question: string
    answer: string
    updated: Date
    created: Date
    id: string
    user_id: string
    cardsPack_id: string
    grade: number
}

const PackTableItem: React.FC<TabItemType> = ({
    question,
    answer,
    cardsPack_id,
    created,
    updated,
    id,
    user_id,
    grade,
}) => {
    const { packUserId } = useAppSelector(selectCards)
    const [deleteCardPack, setDeleteCardPack] = useState<boolean>(false)
    const { deletePack, getPacks } = useActions(packsThunks)
    const { user } = useAppSelector(selectUser)
    const deleteCardPackHandler = useCallback(() => {
        deletePack({ id }).then(() => getPacks({}))
        setDeleteCardPack(false)
    }, [])

    const onDeleteCardPackHandler = () => setDeleteCardPack(!deleteCardPack)

    const date = new Date(updated)
    const transformDate = `${
        date.getDate() > 9 ? date.getDate() + 1 : '0' + (date.getDate() + 1)
    }.${
        date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    }.${date.getFullYear()}`

    return (
        <>
            <CardModal
                isOpen={deleteCardPack}
                setIsOpen={onDeleteCardPackHandler}
                title={'Delete pack'}
            >
                <div className="my-5">
                    Do you really want to delete this card? You won't be able to
                    restore it
                </div>
                <div className="my-4 flex justify-between">
                    <Button
                        className="w-1/3"
                        color={'secondary'}
                        onClick={onDeleteCardPackHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-1/3"
                        color={'warning'}
                        onClick={() => deleteCardPackHandler()}
                    >
                        Delete
                    </Button>
                </div>
            </CardModal>
            <tr className="bg-transparent even:bg-[#ececf9]">
                <td className="w-60 max-w-xs truncate px-4 py-2">{question}</td>
                <td className="w-60 max-w-xs truncate px-4 py-2">{answer}</td>
                <td className="w-22 px-4 py-2">{transformDate}</td>
                <td className="px-4 py-2">{grade}</td>

                {user._id === packUserId && (
                    <td className="flex w-52 justify-end px-4 py-2">
                        <Button
                            className={'ml-1 rounded px-2'}
                            color={'warning'}
                            onClick={onDeleteCardPackHandler}
                        >
                            Delete
                        </Button>

                        <Button
                            className={'ml-1 rounded px-2'}
                            color={'secondary'}
                        >
                            Edit
                        </Button>
                    </td>
                )}
            </tr>
        </>
    )
}

export default PackTableItem
