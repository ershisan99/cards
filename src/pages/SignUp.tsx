import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import {
    selectSignup,
    signupActions,
    signupThunks,
} from '../state/slices/signUpSlice'
import { useActions, useAppSelector } from '../utils/helpers'

const SignUp = () => {
    const [isOpen, setIsOpen] = useState(true)
    const { setConfirmPassword, setPassword, setEmail } =
        useActions(signupActions)
    const { sendSignUpRequest } = useActions(signupThunks)
    const { email, password, confirmPassword } = useAppSelector(selectSignup)
    const navigate = useNavigate()
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-5 text-center font-poppins text-xl font-semibold text-slate">
                    Sign Up
                </div>
                <form>
                    <Input
                        type="email"
                        alias="email"
                        value={email}
                        onChange={(e) => {
                            setEmail({ email: e.currentTarget.value })
                        }}
                    >
                        Email
                    </Input>
                    <Input
                        type="password"
                        alias="password"
                        value={password}
                        onChange={(e) => {
                            setPassword({ password: e.currentTarget.value })
                        }}
                    >
                        Password
                    </Input>
                    <Input
                        type="password"
                        alias="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword({
                                confirmPassword: e.currentTarget.value,
                            })
                        }}
                    >
                        Confirm password
                    </Input>
                </form>

                <div className="mt-20 flex justify-around">
                    <Button
                        color="secondary"
                        className="px-8"
                        onClick={() => navigate('/sign-in')}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        className="px-16"
                        onClick={() =>
                            sendSignUpRequest({
                                email,
                                password,
                            })
                        }
                    >
                        Sign Up
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp
