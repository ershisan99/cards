import React, { KeyboardEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import icon_mail from '../../../assets/images/mail_icon.svg'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import Modal from '../../../components/UI/Modal'
import { Spinner } from '../../../components/UI/Spinner'
import {
    resetPasswordActions,
    resetPasswordThunks,
    selectResetPassword,
} from '../../../state/slices/resetPasswordSlice'
import { userActions } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'

const ResetPassword = () => {
    const customMessage = `
                  <div style='background-color: indianred; padding: 15px'>
                      password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                      link
                    </a>
                  </div>`
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isMessageSent, setIsMessageSent] = useState<boolean>(false)
    const [errorLocal, setErrorLocal] = useState<boolean>(false)

    const { setEmail, setIsLoading } = useActions(resetPasswordActions)
    const { sendResetPasswordRequest } = useActions(resetPasswordThunks)
    const { email, isLoading } = useAppSelector(selectResetPassword)
    const { setInfo, setInfoMessage, setError, setErrorMessageNotification } =
        useActions(userActions)

    const onChangeInputEmail = (e: string) => {
        setErrorLocal(false)
        setEmail({ email: e })
    }

    const sendInstructions = () => {
        if (email.length > 0 && regex.test(email)) {
            setIsLoading({ value: true })
            sendResetPasswordRequest({
                email,
                from: 'Cards 🎴 <marinadegames@gmail.com>',
                message: customMessage,
            })
                .unwrap()
                .then((res) => {
                    setIsLoading({ value: true })
                    setIsOpen(false)
                    setIsMessageSent(true)
                    setInfoMessage({ message: res.info })
                    setInfo({ value: true })
                })
                .catch((err) => {
                    setErrorMessageNotification({ message: err.message })
                    setError({ value: true })
                })
                .finally(() => {
                    setError({ value: false })
                    setInfo({ value: false })
                })
        }
        if (!regex.test(email)) {
            setErrorLocal(true)
        }
    }

    const enterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendInstructions()
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-10 text-center text-xl font-semibold text-slate">
                    Forgot your password?
                </div>
                <form>
                    <Input
                        onChange={(e) =>
                            onChangeInputEmail(e.currentTarget.value)
                        }
                        type="email"
                        alias="email"
                        error={errorLocal}
                        errorText={'Email invalid!'}
                        onKeyPressEnter={(e) => enterKeyHandler(e)}
                    >
                        Email
                    </Input>
                </form>
                <div className="text-md flex justify-center text-light-gray opacity-40">
                    Enter your email address and we will send you further
                    instructions
                </div>

                <div className="mt-20 mb-8 flex items-center justify-center">
                    <Button
                        color="primary"
                        className="px-16"
                        onClick={sendInstructions}
                        disabled={isLoading}
                    >
                        Send Instructions
                    </Button>
                    {isLoading && (
                        <Spinner className={'absolute right-2'} size={'50px'} />
                    )}
                </div>
                <div className="mb-1 text-center text-sm font-semibold text-slate opacity-50">
                    Did you remember your password?
                </div>
                <div className="mb-5 text-center font-semibold text-primary">
                    <Link to={'/sign-in'} className={'cursor-pointer'}>
                        Try logging in
                    </Link>
                </div>
            </Modal>
            <Modal
                isOpen={isMessageSent}
                setIsOpen={() => setIsLoading({ value: false })}
                title="Cards"
            >
                <div className="mb-10 flex justify-center font-semibold text-slate">
                    <img src={icon_mail} alt={'icon_mail'} />
                </div>
                <div className="mb-3 text-center text-xl font-bold text-primary">
                    Check Email
                </div>
                <div className="text-md mb-5 text-center text-light-gray opacity-60">
                    We’ve sent an Email with instructions to {email}
                </div>
            </Modal>
        </div>
    )
}

export default ResetPassword
