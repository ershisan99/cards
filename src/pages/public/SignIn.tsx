import React, { useState } from 'react'
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

const SignIn = () => {
    const [isOpen, setIsOpen] = useState(true)
    const { setRememberMe, setPassword, setEmail } = useActions(signInActions)
    const { sendSignInRequest } = useActions(signInThunks)
    const { email, password, rememberMe } = useAppSelector(selectSignIn)
    const navigate = useNavigate()
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
                        onChange={(e) =>
                            setEmail({ email: e.currentTarget.value })
                        }
                    >
                        Email
                    </Input>
                    <Input
                        type="password"
                        alias="password"
                        value={password}
                        onChange={(e) =>
                            setPassword({ password: e.currentTarget.value })
                        }
                    >
                        Password
                    </Input>
                    <Checkbox
                        alias="remember me"
                        checked={rememberMe}
                        onChange={(e) =>
                            setRememberMe({
                                rememberMe: e.currentTarget.checked,
                            })
                        }
                    >
                        Remember Me
                    </Checkbox>
                </form>
                <div className="flex justify-end text-xs text-slate underline underline-offset-2">
                    <Link to="/reset-password">Forgot your password?</Link>
                </div>
                <div className="mt-20 mb-8 flex justify-center">
                    <Button
                        color="primary"
                        className="px-24"
                        onClick={() =>
                            sendSignInRequest({
                                password,
                                email,
                                rememberMe,
                            })
                                .unwrap()
                                .then(() => navigate(RouteNames.PROFILE))
                                .catch((err) => console.error(err))
                        }
                    >
                        Sign In
                    </Button>
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
