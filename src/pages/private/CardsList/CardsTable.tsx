import React from 'react'
import { Spinner } from '../../../components/UI/Spinner'
import { cardsActions, selectCards } from '../../../state/slices/cardsSlice'
import { selectUser } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'
import CardsTableItem from './CardsTableItem'
import { triangle } from '../../../components/UI/Triangle'

const CardsTable: React.FC = () => {
    const { isLoading, cards, packUserId, sortCards } =
        useAppSelector(selectCards)
    const { updatedSortCards } = useActions(cardsActions)
    const { user } = useAppSelector(selectUser)

    const sortSendValue = (value: string) => {
        if (value === 'QUESTION') {
            sortCards === '0question'
                ? updatedSortCards({ sortCards: '1question' })
                : updatedSortCards({ sortCards: '0question' })
        }
        if (value === 'UPDATED') {
            sortCards === '0updated'
                ? updatedSortCards({ sortCards: '1updated' })
                : updatedSortCards({ sortCards: '0updated' })
        }
        if (value === 'ANSWER') {
            sortCards === '0answer'
                ? updatedSortCards({ sortCards: '1answer' })
                : updatedSortCards({ sortCards: '0answer' })
        }
        if (value === 'GRADE') {
            sortCards === '0grade'
                ? updatedSortCards({ sortCards: '1grade' })
                : updatedSortCards({ sortCards: '0grade' })
        }
    }

    return (
        <>
            <div className="mt-6 h-fit rounded text-xs shadow-md">
                <table className="w-full">
                    <thead className="bg-light p-2 text-left font-medium">
                        <tr>
                            <th
                                className="cursor-pointer px-4 py-4"
                                onClick={() => sortSendValue('QUESTION')}
                            >
                                <div className="flex flex-row items-center">
                                    Question
                                    {sortCards === '0question' &&
                                        triangle('down')}
                                    {sortCards === '1question' &&
                                        triangle('up')}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-4 py-3"
                                onClick={() => sortSendValue('ANSWER')}
                            >
                                <div className="flex flex-row items-center">
                                    Answer
                                    {sortCards === '0answer' &&
                                        triangle('down')}
                                    {sortCards === '1answer' && triangle('up')}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-4 py-3"
                                onClick={() => sortSendValue('UPDATED')}
                            >
                                <div className="flex flex-row items-center">
                                    Updated
                                    {sortCards === '0updated' &&
                                        triangle('down')}
                                    {sortCards === '1updated' && triangle('up')}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-4 py-3"
                                onClick={() => sortSendValue('GRADE')}
                            >
                                <div className="flex flex-row items-center">
                                    Grade
                                    {sortCards === '0grade' && triangle('down')}
                                    {sortCards === '1grade' && triangle('up')}
                                </div>
                            </th>
                            {packUserId === user!._id && (
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
