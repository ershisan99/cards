import React, { useState } from 'react'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { NavLink } from 'react-router-dom'
import Button from '../components/Button'
import icon_mail from '../images/mail_icon.svg'

const ResetPassword = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isMessageSent, setIsMessageSent] = useState<boolean>(false)
    const [inputEmail, setInputEmail] = useState<string>('')

    const onChangeInputEmail = (e: string) => {
        setInputEmail(e)
        // todo: use regex
        // (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    }
    const sendInstructions = () => {
        if (inputEmail.length > 0) {
            setIsOpen(false)
            setIsMessageSent(true)
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
                    <NavLink to={'/sign-in'} className={'cursor-pointer'}>
                        Try logging in
                    </NavLink>
                </div>
            </Modal>

            <Modal
                isOpen={isMessageSent}
                setIsOpen={setIsMessageSent}
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
