import React, { ChangeEvent, useCallback, useState } from 'react'
import Button from '../../../components/UI/Button'
import CardModal from '../../../components/UI/CardChangeModal'
import Input from '../../../components/UI/Input'

type PropsType = {
    modalTitle: string
    isOpen: boolean
    questionTitle: string
    answerTitle: string
    callback: (question: string, answer: string) => void
    changeEditCardMode: () => void
}

const EditCardModal = ({
    isOpen,
    questionTitle,
    answerTitle,
    callback,
    changeEditCardMode,
    modalTitle,
}: PropsType) => {
    const [questionValue, setQuestionValue] = useState<string>(questionTitle)
    const [answerValue, setAnswerValue] = useState<string>(answerTitle)

    const questionValueChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setQuestionValue(e.currentTarget.value)
        },
        []
    )
    const answerValueChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setAnswerValue(e.currentTarget.value)
        },
        []
    )

    const saveCard = () => {
        callback(questionValue, answerValue)
    }

    return (
        <CardModal
            isOpen={isOpen}
            setIsOpen={changeEditCardMode}
            title={modalTitle}
        >
            <Input
                autoFocus
                alias={'Card Name'}
                className="my-6"
                value={questionValue}
                onChange={(e) => questionValueChange(e)}
            >
                Question
            </Input>
            <Input
                alias={'Card Name'}
                className="my-6"
                value={answerValue}
                onChange={(e) => answerValueChange(e)}
            >
                Answer
            </Input>
            <div className="my-4 flex justify-between">
                <Button
                    className="w-1/3"
                    color={'secondary'}
                    onClick={changeEditCardMode}
                >
                    Cancel
                </Button>
                <Button className="w-1/3" color={'primary'} onClick={saveCard}>
                    Save
                </Button>
            </div>
        </CardModal>
    )
}
export default EditCardModal
