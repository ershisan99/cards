import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import cross from './../../assets/images/cross.svg'

type PropsType = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    title: string
}

const CardModal: FC<PropsType> = ({ isOpen, setIsOpen, title, children }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto bg-cardModal"
                    onClose={() => {
                        setIsOpen(true)
                    }}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-sm transform overflow-hidden border-none bg-white  text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between border px-6 py-4 align-middle text-sm">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-center text-lg"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <button onClick={() => setIsOpen(false)}>
                                        <img src={cross} alt="cross icon" />
                                    </button>
                                </div>
                                <div className="px-6 py-4">{children}</div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default CardModal
