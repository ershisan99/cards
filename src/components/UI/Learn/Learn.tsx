import LearnModal from './LearnModal'
import Button from '../Button'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {
    getRandomCard,
    useActions,
    useAppSelector,
} from '../../../utils/helpers'
import { cardsThunks, selectCards } from '../../../state/slices/cardsSlice'
import { CardsType } from '../../../API/cardsAPI'
import Radio from '../Radio'

const grades = [
    'Did not know',
    'Forgot',
    'A lot of thought',
    'Сonfused',
    'Knew the answer',
]

const Learn = () => {
    const { id: cardsPack_id } = useParams()
    const { cards } = useAppSelector(selectCards)
    const { getCards, updateGrade } = useActions(cardsThunks)

    const [card, setCard] = useState<CardsType>()
    const [first, setFirst] = useState<boolean>(true)
    const [grade, setGrade] = useState<number>(0)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    useEffect(() => {
        if (first) {
            cardsPack_id && getCards({ cardsPack_id: cardsPack_id })
            setFirst(false)
        }

        if (cards && cards.length > 0) setCard(getRandomCard(cards))
    }, [cardsPack_id, cards, first])

    const onNext = () => {
        updateGrade({ card_id: card!._id, grade })

        if (cards && cards.length > 0) {
            setCard(getRandomCard(cards))
            setShowAnswer(false)
        }
    }

    const onChangeGrade = (value: string) => {
        switch (value) {
            case 'Did not know': {
                setGrade(1)
                break
            }
            case 'Forgot': {
                setGrade(2)
                break
            }
            case 'A lot of thought': {
                setGrade(3)
                break
            }
            case 'Сonfused': {
                setGrade(4)
                break
            }
            case 'Knew the answer': {
                setGrade(5)
                break
            }
            default:
                setGrade(0)
        }
    }

    return (
        <>
            <LearnModal isOpen={true} title={'Learn “Pack Name”'}>
                {!showAnswer ? (
                    <div className="my-2 text-base">
                        <b>Question:</b> {card && card.question}
                    </div>
                ) : (
                    <div className="my-2 text-base">
                        <div className="my-2">
                            <b>Question:</b> {card && card.question}
                        </div>
                        <div className="my-2">
                            <b>Answer:</b> {card && card.answer}
                        </div>
                        <div>
                            <b>Rate yourself:</b>
                            <div className="my-4">
                                <Radio
                                    name="radio"
                                    options={grades}
                                    value={grade}
                                    onChangeOption={onChangeGrade}
                                />
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
        </>
    )
}

export default Learn
