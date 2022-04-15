import React, { KeyboardEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import complete_icon from '../../assets/images/complete_icon.svg.png'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { Spinner } from '../../components/UI/Spinner'
import { RouteNames } from '../../routes'
import {
    selectSignup,
    signupActions,
    signupThunks,
} from '../../state/slices/signUpSlice'
import { userActions } from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'

const SignUp = () => {
    const regexPassword = /[A-Za-z0-9]{8,}/
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const [isOpen, setIsOpen] = useState(true)
    const [isMessageSent, setIsMessageSent] = useState<boolean>(false)

    const { setInfo, setInfoMessage, setError, setErrorMessageNotification } =
        useActions(userActions)

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
        setIsLoading({ value: true })
        if (!regexPassword.test(password)) {
            setErrorPassword({ error: true })
            setErrorPasswordText({
                errorText: 'Password must follow the rules',
            })
            setIsLoading({ value: false })
        }
        if (password !== confirmPassword) {
            setErrorPassword({ error: true })
            setErrorPasswordText({
                errorText: 'Passwords do not match',
            })
            setIsLoading({ value: false })
        }
        if (!regexEmail.test(email)) {
            setErrorEmail({ error: true })
            setIsLoading({ value: false })
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
                .then((res) => {
                    setIsLoading({ value: false })
                    setIsOpen(false)
                    setIsMessageSent(true)
                    setInfoMessage({ message: res.statusText })
                    setInfo({ value: true })
                })
                .catch((err) => {
                    setErrorMessageNotification({ message: err.error })
                    setError({ value: true })
                })
                .finally(() => {
                    setIsLoading({ value: false })
                    setError({ value: false })
                    setInfo({ value: false })
                })
        }
    }

    const enterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendNewUserHandler()
        }
    }

    const navigateBack = () => {
        navigate(RouteNames.SIGN_IN)
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
                        onKeyPressEnter={(e) => enterKeyHandler(e)}
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
                <div className="mt-10 flex items-center justify-around">
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
                        disabled={isLoading}
                    >
                        Sign Up
                    </Button>
                    {isLoading && (
                        <Spinner
                            className={'absolute -right-0.5'}
                            size={'40px'}
                        />
                    )}
                </div>
            </Modal>
            <Modal
                isOpen={isMessageSent}
                setIsOpen={() => setIsLoading({ value: false })}
                title="Cards"
            >
                <div className="flex-center flex flex-col items-center justify-center">
                    <div className="mb-10 flex justify-center font-poppins font-semibold text-slate">
                        <img
                            src={complete_icon}
                            alt={'icon_mail'}
                            style={{ width: '100px' }}
                        />
                    </div>
                    <div className="mb-3 text-center text-xl font-bold text-primary">
                        Are you registered!
                    </div>
                    <div className="text-md mb-5 text-center text-light-gray opacity-60">
                        You can login using your data.
                    </div>
                    <Button
                        color="primary"
                        className="w-60"
                        onClick={navigateBack}
                    >
                        Go back
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp
