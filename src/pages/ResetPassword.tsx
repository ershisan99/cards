import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const ResetPassword = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-10 text-center font-poppins text-xl font-semibold text-slate">
                    Forgot your password?
                </div>
                <form>
                    <Input type="email" alias="email">
                        Email
                    </Input>
                </form>
                <div className="text-md flex justify-center text-light-gray opacity-40">
                    Enter your email address and we will send you further
                    instructions
                </div>
                <div className="mt-20 mb-8 flex justify-center">
                    <Button color="primary" className="px-20">
                        Send Instructions
                    </Button>
                </div>
                <div className="mb-1 text-center text-sm font-semibold text-slate opacity-50">
                    Did you remember your password?
                </div>
                <div className="text-center font-semibold text-primary">
                    Try logging in
                </div>
            </Modal>
        </div>
    )
}

export default ResetPassword
