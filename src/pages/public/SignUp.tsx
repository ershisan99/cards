import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { RouteNames } from '../../routes'
import {
    selectSignup,
    signupActions,
    signupThunks,
} from '../../state/slices/signUpSlice'
import { useActions, useAppSelector } from '../../utils/helpers'

const SignUp = () => {
    const regexPassword = /[A-Za-z0-9]{8,}/
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const [isOpen, setIsOpen] = useState(true)

    const {
        setConfirmPassword,
        setPassword,
        setEmail,
        setErrorEmail,
        setErrorPassword,
        setErrorPasswordText,
        setIsLoading,
    } = useActions(signupActions)
    const { sendSignUpRequest } = useActions(signupThunks)
    const {
        email,
        password,
        confirmPassword,
        errorPassword,
        errorEmail,
        errorPasswordText,
        isLoading,
    } = useAppSelector(selectSignup)

    const navigate = useNavigate()

    const sendNewUserHandler = () => {
        if (!regexPassword.test(password)) {
            setErrorPassword({ error: true })
            setErrorPasswordText({
                errorText: 'Password must follow the rules',
            })
        }
        if (password !== confirmPassword) {
            setErrorPassword({ error: true })
            setErrorPasswordText({
                errorText: 'Passwords do not match',
            })
        }
        if (!regexEmail.test(email)) {
            setErrorEmail({ error: true })
        }
        if (
            password === confirmPassword &&
            regexPassword.test(password) &&
            regexEmail.test(email)
        ) {
            sendSignUpRequest({
                email,
                password,
            })
                .unwrap()
                .then(() => navigate(RouteNames.SIGN_IN))
                .catch((err) => console.error(err))
        }
    }

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
                        error={errorEmail}
                        errorText={'Invalid email'}
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
                        error={errorPassword}
                        errorText={errorPasswordText}
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
                        error={errorPassword}
                        errorText={errorPasswordText}
                        onChange={(e) => {
                            setConfirmPassword({
                                confirmPassword: e.currentTarget.value,
                            })
                        }}
                    >
                        Confirm password
                    </Input>
                </form>
                <div className="mt-3 flex flex-col justify-center text-sm text-light-gray opacity-40">
                    <b>The password must contain:</b>
                    • at least 8 characters
                    <br />
                    • numbers <br />
                    • upper and lower case
                    <br />
                </div>
                <div className="mt-10 flex justify-around">
                    <Button
                        color="secondary"
                        className="px-8"
                        onClick={() => navigate(RouteNames.SIGN_IN)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        className="px-16"
                        onClick={sendNewUserHandler}
                    >
                        Sign Up
                    </Button>
                    <Spinner
                        isLoading={true}
                        className={'right absolute'}
                        size={'50px'}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default SignUp
