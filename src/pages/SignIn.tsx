import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const SignIn = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cards">
                <div className="mb-5 text-center font-poppins text-xl font-semibold text-slate">
                    Sign In
                </div>
                <form>
                    <Input type="email" alias="email">
                        Email
                    </Input>
                    <Input type="password" alias="password">
                        Password
                    </Input>
                </form>
                <div className="flex justify-end text-xs text-slate underline underline-offset-2">
                    Forgot your password?
                </div>
                <div className="mt-20 mb-8 flex justify-center">
                    <Button color="primary" className="px-24">
                        Sign In
                    </Button>
                </div>
                <div className="mb-1 text-center text-sm font-semibold text-slate opacity-50">
                    Don't have an account?
                </div>
                <div className="text-center font-semibold text-primary">
                    Sign Up
                </div>
            </Modal>
        </div>
    )
}

export default SignIn
