import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CardsType } from '../../../API/cardsAPI'
import {
    cardsActions,
    cardsThunks,
    selectCards,
} from '../../../state/slices/cardsSlice'
import { packsThunks, selectPacks } from '../../../state/slices/packsSlice'
import {
    getRandomCard,
    useActions,
    useAppSelector,
} from '../../../utils/helpers'
import Button from '../Button'
import Radio from '../Radio'
import LearnModal from './LearnModal'

const grades = [
    "Didn't answer, 1/5",
    "Wasn't sure, 2/5",
    'Knew something, 3/5',
    'Mostly knew the answer, 4/5',
    'Knew the answer, 5/5',
]

const Learn = () => {
    const { id: cardsPack_id } = useParams()
    const { cards } = useAppSelector(selectCards)
    const { cardPacks } = useAppSelector(selectPacks)
    const { getCards, updateGrade, getPacks, setIsLoading } = useActions({
        ...cardsThunks,
        ...packsThunks,
        ...cardsActions,
    })

    const [card, setCard] = useState<CardsType>()
    const [first, setFirst] = useState<boolean>(true)
    const [grade, setGrade] = useState<number>(0)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const pack = cardPacks.find((p) => p._id === cardsPack_id)
    console.log(pack)
    useEffect(() => {
        if (first) {
            setIsLoading({ isLoading: true })
            cardPacks.length === 0
                ? getPacks({}).finally(() => {
                      const pack = cardPacks.find((p) => p._id === cardsPack_id)

                      cardsPack_id &&
                          getCards({
                              cardsPack_id: cardsPack_id,
                              pageCount: pack?.cardsCount || Infinity,
                          })
                  })
                : cardsPack_id &&
                  getCards({
                      cardsPack_id: cardsPack_id,
                      pageCount: pack?.cardsCount || Infinity,
                  })
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
            case "Didn't answer, 1/5": {
                setGrade(1)
                break
            }
            case "Wasn't sure, 2/5": {
                setGrade(2)
                break
            }
            case 'Knew something, 3/5': {
                setGrade(3)
                break
            }
            case 'Mostly knew the answer, 4/5': {
                setGrade(4)
                break
            }
            case 'Knew the answer, 5/5': {
                setGrade(5)
                break
            }
            default:
                setGrade(0)
        }
    }

    return (
        <>
            <LearnModal isOpen={true} title={`Learn ${pack?.name || ''}`}>
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
