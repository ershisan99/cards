import React, { KeyboardEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import Modal from '../../../components/UI/Modal'
import { RouteNames } from '../../../routes'
import {
    newPasswordActions,
    newPasswordThunks,
    selectNewPassword,
} from '../../../state/slices/newPasswordSlice'
import { userActions } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'

const NewPassword = () => {
    const regex = /[A-Za-z0-9]{8,}/
    const { token } = useParams()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [errorLocal, setErrorLocal] = useState<boolean>(false)
    const { setPassword } = useActions(newPasswordActions)
    const { sendNewPasswordRequest } = useActions(newPasswordThunks)
    const { password } = useAppSelector(selectNewPassword)
    const { setInfo, setInfoMessage, setError, setErrorMessageNotification } =
        useActions(userActions)

    const onChangeInputPassword = (e: string) => {
        setErrorLocal(false)
        setPassword({ password: e })
    }

    const sendNewPassword = () => {
        if (regex.test(password) && token) {
            sendNewPasswordRequest({
                password,
                resetPasswordToken: token,
            })
                .unwrap()
                .then((res) => {
                    setInfoMessage({ message: res.statusText })
                    setInfo({ value: true })
                    navigate(RouteNames.SIGN_IN)
                })
                .catch((err) => {
                    setErrorMessageNotification({ message: err.message })
                    setError({ value: true })
                })
                .finally(() => {
                    setInfo({ value: false })
                    setError({ value: false })
                })
        }

        if (!regex.test(password)) setErrorLocal(true)
    }

    const enterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendNewPassword()
        }
    }

    // return
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-10 text-center text-xl font-semibold text-slate">
                    Create new password
                </div>
                <form>
                    <Input
                        onChange={(e) =>
                            onChangeInputPassword(e.currentTarget.value)
                        }
                        type="password"
                        alias="password"
                        error={errorLocal}
                        errorText={
                            'Invalid password! Please read the rules below!'
                        }
                        onKeyPressEnter={(e) => enterKeyHandler(e)}
                    >
                        Password
                    </Input>
                </form>
                <div className="text-md flex justify-center text-light-gray opacity-40">
                    Create a new password
                </div>
                <div className="text-md mt-3 flex flex-col justify-center text-light-gray opacity-40">
                    <b>The password must contain:</b>
                    • at least 8 characters
                    <br />
                    • numbers <br />
                    • upper and lower case
                    <br />
                </div>
                <div className="mt-10 mb-5 flex justify-center">
                    <Button
                        color="primary"
                        className="px-20"
                        onClick={sendNewPassword}
                    >
                        Create new password
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default NewPassword
