import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const SignUp = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-5 text-center font-poppins text-xl font-semibold text-slate">
                    Sign Up
                </div>
                <form>
                    <Input type="email" alias="email">
                        Email
                    </Input>
                    <Input type="password" alias="password">
                        Password
                    </Input>
                    <Input type="password" alias="confirm-password">
                        Confirm password
                    </Input>
                </form>

                <div className="mt-20 flex justify-around">
                    <Button color="secondary" className="px-8">
                        Cancel
                    </Button>
                    <Button color="primary" className="px-16">
                        Sign Up
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp
