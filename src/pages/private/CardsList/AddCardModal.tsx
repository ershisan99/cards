import React, { ChangeEvent, useCallback, useState } from 'react'
import { useParams } from 'react-router'
import Button from '../../../components/UI/Button'
import CardModal from '../../../components/UI/CardChangeModal'
import Input from '../../../components/UI/Input'
import { cardsThunks } from '../../../state/slices/cardsSlice'
import { useActions } from '../../../utils/helpers'

const AddPackModal = () => {
    const { addCard } = useActions(cardsThunks)
    const [addCardPack, setAddCardPack] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const onCardPackHandler = () => setAddCardPack(!addCardPack)
    const { id: cardsPack_id } = useParams()
    const addCardHandler = () => {
        cardsPack_id && addCard({ card: { cardsPack_id, question, answer } })
        setAnswer('')
        setQuestion('')
        setAddCardPack(false)
    }

    const onQuestionChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setQuestion(e.currentTarget.value)
        },
        []
    )
    const onAnswerChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setAnswer(e.currentTarget.value)
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
                Add new card
            </Button>
            <CardModal
                isOpen={addCardPack}
                setIsOpen={onCardPackHandler}
                title={'Add new card'}
            >
                <Input
                    alias={'Card Name'}
                    className="my-6"
                    value={question}
                    onChange={(e) => onQuestionChangeHandler(e)}
                >
                    Question
                </Input>
                <Input
                    alias={'Card Name'}
                    className="my-6"
                    value={answer}
                    onChange={(e) => onAnswerChangeHandler(e)}
                >
                    Answer
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
                        onClick={() => addCardHandler()}
                    >
                        Save
                    </Button>
                </div>
            </CardModal>
        </div>
    )
}

export default AddPackModal
