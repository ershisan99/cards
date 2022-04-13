import React, { KeyboardEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import Checkbox from '../../components/UI/Checkbox'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { RouteNames } from '../../routes'
import {
    selectSignIn,
    signInActions,
    signInThunks,
} from '../../state/slices/signInSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import { Spinner } from '../../components/UI/Spinner'

const SignIn = () => {
    console.log('SignIn render')
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const [isOpen, setIsOpen] = useState(true)
    const {
        setRememberMe,
        setPassword,
        setEmail,
        setError,
        setErrorEmail,
        setIsLoading,
        setErrorMessageNotification,
    } = useActions(signInActions)
    const { sendSignInRequest } = useActions(signInThunks)
    const { email, password, rememberMe, errorEmail, isLoading } =
        useAppSelector(selectSignIn)
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
                        navigate('../' + RouteNames.PROFILE)
                    }
                })
                .catch((err) => {
                    setIsLoading({ value: false })
                    setEmail({ email: '' })
                    setPassword({ password: '' })
                    setErrorMessageNotification({ message: err.message })
                    setError({ value: true })
                })
                .finally(() => {
                    setIsLoading({ value: false })
                    setError({ value: false })
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
                <div className="mb-5 text-center font-poppins text-xl font-semibold text-slate">
                    Sign In
                </div>
                <form>
                    <Input
                        type="email"
                        alias="email"
                        value={email}
                        error={errorEmail}
                        errorText={'Incorrect email'}
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
                    <Spinner
                        isLoading={isLoading}
                        size={'40px'}
                        className="absolute right-8"
                    />
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
