import React, { KeyboardEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../components/UI/Button'
import Checkbox from '../../../components/UI/Checkbox'
import Input from '../../../components/UI/Input'
import Modal from '../../../components/UI/Modal'
import { Spinner } from '../../../components/UI/Spinner'
import {
    selectSignIn,
    signInActions,
    signInThunks,
} from '../../../state/slices/signInSlice'
import { userActions } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'

const SignIn = () => {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const [isOpen, setIsOpen] = useState(true)
    const {
        setRememberMe,
        setPassword,
        setEmail,
        setErrorEmail,
        setIsLoading,
    } = useActions(signInActions)
    const { sendSignInRequest } = useActions(signInThunks)
    const { email, password, rememberMe, errorEmail, isLoading } =
        useAppSelector(selectSignIn)
    const { setErrorMessageNotification, setError } = useActions(userActions)
    const navigate = useNavigate()

    const signInButton = () => {
        if (!regexEmail.test(email)) {
            setErrorEmail({ value: true })
        }

        if (regexEmail.test(email)) {
            setIsLoading({ value: true })
            sendSignInRequest({
                password,
                email,
                rememberMe,
            })
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        setIsLoading({ value: false })
                        navigate('../profile/?userId=' + res._id)
                    }
                })
                .catch((err) => {
                    setIsLoading({ value: false })
                    setEmail({ email: '' })
                    setPassword({ password: '' })
                    setErrorMessageNotification({ message: err.message })
                    setError({ value: true })
                })
        }
    }

    const enterKeyHandler = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                signInButton()
            }
        },
        []
    )

    const onChangeEmail = useCallback((e: string) => {
        setEmail({ email: e })
    }, [])
    const onChangePassword = useCallback((e: string) => {
        setPassword({ password: e })
    }, [])

    const onChangeRememberMe = useCallback((e: boolean) => {
        setRememberMe({ rememberMe: e })
    }, [])

    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-5 text-center text-xl font-semibold text-slate">
                    Sign In
                </div>
                <form>
                    <Input
                        type="email"
                        alias="email"
                        value={email}
                        error={errorEmail}
                        errorText={'Incorrect email'}
                        onKeyPress={(e) => enterKeyHandler(e)}
                        onChange={(e) => onChangeEmail(e.currentTarget.value)}
                    >
                        Email
                    </Input>
                    <Input
                        type="password"
                        alias="password"
                        value={password}
                        onChange={(e) =>
                            onChangePassword(e.currentTarget.value)
                        }
                        onKeyPress={(e) => enterKeyHandler(e)}
                    >
                        Password
                    </Input>
                    <Checkbox
                        alias="remember me"
                        checked={rememberMe}
                        onChange={(e) =>
                            onChangeRememberMe(e.currentTarget.checked)
                        }
                    >
                        Remember Me
                    </Checkbox>
                </form>
                <div className="flex justify-end text-xs text-slate underline underline-offset-2">
                    <Link to="/reset-password">Forgot your password?</Link>
                </div>
                <div className="mt-10 mb-8 flex justify-center">
                    <Button
                        color="primary"
                        className="px-24"
                        onClick={signInButton}
                        disabled={isLoading}
                    >
                        Sign In
                    </Button>
                    {isLoading && (
                        <Spinner size={'40px'} className="absolute right-8" />
                    )}
                </div>
                <div className="mb-1 text-center text-sm font-semibold text-slate opacity-50">
                    Don't have an account?
                </div>

                <div className="text-center font-semibold text-primary">
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            </Modal>
        </div>
    )
}

export default SignIn
