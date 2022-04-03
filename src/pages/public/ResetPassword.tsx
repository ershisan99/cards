import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import icon_mail from '../../assets/images/mail_icon.svg'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { useActions, useAppSelector } from '../../utils/helpers'
import {
    resetPasswordActions,
    resetPasswordThunks,
    selectResetPassword,
} from '../../state/slices/resetPasswordSlice'

const ResetPassword = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const { email, isLoading, isMessageSent } =
        useAppSelector(selectResetPassword)
    const { setEmail, setIsLoading, setIsMessageSent } =
        useActions(resetPasswordActions)
    const { sendResetPasswordRequest } = useActions(resetPasswordThunks)

    const onChangeInputEmail = (e: string) => {
        setEmail({ email: e })

        // todo: use regex
        // (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    }
    const sendInstructions = () => {
        if (email.length > 0) {
            setIsOpen(false)
            sendResetPasswordRequest({
                email,
                from: 'test-front-admin <lazlo9ilazlo9i@gmail.com>',
                message: `<div style="background-color: lime; padding: 15px">
    password recovery link:
    <a href="http://localhost:3000/#/set-new-password/$token$">
    link</a>
    </div>`,
            })
                .unwrap()
                .then(() => {
                    setIsMessageSent({ isMessageSent: true })
                })
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-10 text-center font-poppins text-xl font-semibold text-slate">
                    Forgot your password?
                </div>
                <form>
                    <Input
                        onChange={(e) =>
                            onChangeInputEmail(e.currentTarget.value)
                        }
                        type="email"
                        alias="email"
                    >
                        Email
                    </Input>
                </form>
                <div className="text-md flex justify-center text-light-gray opacity-40">
                    Enter your email address and we will send you further
                    instructions
                </div>
                <div className="mt-20 mb-8 flex justify-center">
                    <Button
                        color="primary"
                        className="px-20"
                        onClick={sendInstructions}
                    >
                        Send Instructions
                    </Button>
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
                setIsOpen={() => setIsMessageSent({ isMessageSent: true })}
                title="Cards"
            >
                <div className="mb-10 flex justify-center font-poppins font-semibold text-slate">
                    <img src={icon_mail} alt={'icon_mail'} />
                </div>
                <div className="mb-3 text-center text-xl font-bold text-primary">
                    Check Email
                </div>
                <div className="text-md mb-5 text-center text-light-gray opacity-60">
                    We’ve sent an Email with instructions to example@mail.com
                </div>
            </Modal>
        </div>
    )
}

export default ResetPassword
