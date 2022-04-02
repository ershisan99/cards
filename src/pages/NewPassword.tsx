import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const NewPassword = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-5 text-center font-poppins text-xl font-semibold text-slate">
                    Create new password
                </div>
                <form>
                    <Input type="password" alias="password">
                        Password
                    </Input>
                </form>
                <div className="text-md flex justify-center text-light-gray opacity-40">
                    Create new password and we will send you further
                    instructions to email
                </div>
                <div className="mt-20 mb-5 flex justify-center">
                    <Button color="primary" className="px-20">
                        Create new password
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default NewPassword
