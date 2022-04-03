import React, { useState } from 'react'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { useActions, useAppSelector } from '../../utils/helpers'
import {
    newPasswordActions,
    newPasswordThunks,
    selectNewPassword,
} from '../../state/slices/newPasswordSlice'
import { useNavigate, useParams } from 'react-router'
import { RouteNames } from '../../routes'

const NewPassword = () => {
    const regex = /[A-Za-z0-9]{8,}/
    const { token } = useParams()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const { setPassword } = useActions(newPasswordActions)
    const { sendNewPasswordRequest } = useActions(newPasswordThunks)
    const { password } = useAppSelector(selectNewPassword)

    const onChangeInputPassword = (e: string) => {
        setError(false)
        setPassword({ password: e })
    }

    const sendNewPassword = () => {
        if (regex.test(password) && token) {
            sendNewPasswordRequest({
                password,
                resetPasswordToken: token,
            })
                .unwrap()
                .then(() => {
                    navigate(RouteNames.SIGN_IN)
                })
                .catch((res) => {
                    console.log(res.error)
                })
        }

        if (!regex.test(password)) setError(true)
    }

    // return
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-10 text-center font-poppins text-xl font-semibold text-slate">
                    Create new password
                </div>
                <form>
                    <Input
                        onChange={(e) =>
                            onChangeInputPassword(e.currentTarget.value)
                        }
                        type="password"
                        alias="password"
                    >
                        Password
                    </Input>
                </form>
                {error && (
                    <h1 className="text-red-500">ERROR! INVALID PASSWORD!</h1>
                )}
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
