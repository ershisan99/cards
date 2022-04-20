import LearnModal from './LearnModal'
import Button from '../Button'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useActions, useAppSelector } from '../../../utils/helpers'
import { cardsThunks, selectCards } from '../../../state/slices/cardsSlice'
import { CardsType } from '../../../API/cardsAPI'
import Checkbox from '../Checkbox'

const getRandomCard = (cards: Array<CardsType>) => {
    const sum = cards.reduce(
        (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
        0
    )
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return { sum: newSum, id: newSum < rand ? i : acc.id }
        },
        { sum: 0, id: -1 }
    )
    return cards[res.id + 1]
}

const grades = [
    'Did not know',
    'Forgot',
    'A lot of thought',
    'Сonfused',
    'Knew the answer',
]

const Learn = () => {
    const { cards } = useAppSelector(selectCards)
    const { id: cardsPack_id } = useParams()
    const { getCards } = useActions(cardsThunks)

    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [card, setCard] = useState<CardsType>()
    const [first, setFirst] = useState<boolean>(true)

    useEffect(() => {
        if (first) {
            cardsPack_id && getCards({ cardsPack_id: cardsPack_id })
            setFirst(false)
        }

        if (cards && cards.length > 0) setCard(getRandomCard(cards))
    }, [cardsPack_id, cards, first])

    const onNext = () => {
        if (cards && cards.length > 0) {
            setCard(getRandomCard(cards))
            setShowAnswer(false)
        }
    }

    return (
        <div>
            <LearnModal isOpen={true} title={'Learn “Pack Name”'}>
                {!showAnswer ? (
                    <div className="my-2 mb-8 text-base">
                        <b>Question:</b> {card && card.question}
                    </div>
                ) : (
                    <div className="my-2 mb-8 flex flex-col text-base">
                        <b>Question:</b> {card && card.question}
                        <b>Answer:</b> {card && card.answer}
                        <div className="mt-6">
                            <b>Rate yourself:</b>
                            <div className="flex flex-col">
                                {grades.map((g, i) => (
                                    <Checkbox alias={g} key={i}>
                                        {g}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-4 flex justify-between">
                    <Link to={`/main`}>
                        <Button color={'secondary'} className="px-8">
                            Cancel
                        </Button>
                    </Link>
                    {!showAnswer ? (
                        <Button
                            color={'primary'}
                            onClick={() => setShowAnswer(true)}
                            className="px-8"
                        >
                            Show answer
                        </Button>
                    ) : (
                        <Button
                            color={'primary'}
                            onClick={onNext}
                            className="px-8"
                        >
                            Next
                        </Button>
                    )}
                </div>
            </LearnModal>
        </div>
    )
}

export default Learn
