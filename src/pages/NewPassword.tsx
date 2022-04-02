import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const NewPassword = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [password, setPassword] = useState<string>('')

    const onChangeInputPassword = (e: string) => {
        setPassword(e)
    }
    const sendNewPassword = () => {
        // todo use regexp
        // (/[A-Za-z0-9]{6,}/)
        console.log(password)
    }

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
                <div className="text-md flex justify-center text-light-gray opacity-40">
                    Create new password and we will send you further
                    instructions to email
                </div>
                <div className="mt-20 mb-5 flex justify-center">
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
