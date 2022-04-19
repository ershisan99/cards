import React from 'react'
import { Spinner } from '../../../components/UI/Spinner'
import { selectCards } from '../../../state/slices/cardsSlice'
import { selectUser } from '../../../state/slices/UserSlice'
import { useAppSelector } from '../../../utils/helpers'
import CardsTableItem from './CardsTableItem'

const CardsTable: React.FC = () => {
    const { isLoading, cards, packUserId } = useAppSelector(selectCards)
    const { user } = useAppSelector(selectUser)
    return (
        <>
            <div className="mt-6 h-fit rounded text-xs shadow-md">
                <table className="w-full">
                    <thead className="bg-light p-2 text-left font-medium">
                        <tr>
                            <th className="px-4 py-4">Question</th>
                            <th className="px-4 py-3">Answer</th>
                            <th className="px-4 py-3">Updated</th>
                            <th className="px-4 py-3">Grade</th>
                            {packUserId === user._id && (
                                <th className="px-4 py-3">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="table-cell">
                                    <Spinner
                                        size={'100px'}
                                        className="flex w-full items-center justify-center"
                                    />
                                </td>
                            </tr>
                        ) : cards.length > 0 ? (
                            cards.map((card) => {
                                return (
                                    <CardsTableItem
                                        key={card._id}
                                        cardsPack_id={card.cardsPack_id}
                                        question={card.question}
                                        answer={card.answer}
                                        updated={card.updated}
                                        created={card.created}
                                        user_id={card.user_id}
                                        id={card._id}
                                        grade={card.grade}
                                    />
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="table-cell">
                                    <span className="flex w-full justify-center py-4 text-2xl text-primary">
                                        No cards found!
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CardsTable
