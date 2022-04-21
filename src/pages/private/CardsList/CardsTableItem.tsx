import React, { useCallback, useState } from 'react'
import Button from '../../../components/UI/Button'
import CardModal from '../../../components/UI/CardChangeModal'
import { cardsThunks, selectCards } from '../../../state/slices/cardsSlice'
import { selectUser } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'
import EditCardModal from './EditCardModal'

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
    updated,
    id,
    grade,
}) => {
    const { packUserId } = useAppSelector(selectCards)
    const [deleteCardPack, setDeleteCardPack] = useState<boolean>(false)
    const [editCardMode, setEditCardMode] = useState<boolean>(false)
    const { updateCard, getCards, deleteCard } = useActions(cardsThunks)
    const { user } = useAppSelector(selectUser)

    const deleteCardHandler = useCallback(() => {
        deleteCard({ id }).then(() => getCards({ cardsPack_id }))
        setDeleteCardPack(false)
    }, [])

    const saveCard = useCallback((question: string, answer: string) => {
        updateCard({ card: { _id: id, question, answer } }).then(() =>
            getCards({ cardsPack_id })
        )
        setEditCardMode(false)
    }, [])

    const onDeleteCardPackHandler = () => setDeleteCardPack(!deleteCardPack)
    const onchangeEditModeCard = () => setEditCardMode(!editCardMode)

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
                        onClick={deleteCardHandler}
                    >
                        Delete
                    </Button>
                </div>
            </CardModal>

            <EditCardModal
                isOpen={editCardMode}
                callback={saveCard}
                questionTitle={question}
                answerTitle={answer}
                changeEditCardMode={onchangeEditModeCard}
                modalTitle={'Edit card'}
            />

            <tr className="bg-transparent even:bg-[#ececf9]">
                <td className="w-60 max-w-xs truncate px-4 py-2">{question}</td>
                <td className="w-60 max-w-xs truncate px-4 py-2">{answer}</td>
                <td className="w-22 px-4 py-2">{transformDate}</td>
                <td className="px-4 py-2">{grade.toFixed(1)}</td>

                {user!._id === packUserId && (
                    <td className="flex w-32 px-4 py-2">
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
                            onClick={onchangeEditModeCard}
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
