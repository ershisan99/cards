import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment } from 'react'
import { selectCards } from '../../../state/slices/cardsSlice'
import { useAppSelector } from '../../../utils/helpers'
import { Spinner } from '../Spinner'

type PropsType = {
    isOpen: boolean
    setIsOpen?: (isOpen: boolean) => void
    title: string
}

const LearnModal: FC<PropsType> = ({ title, children }) => {
    const { isLoading } = useAppSelector(selectCards)

    return (
        <>
            <Transition appear show={true} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => console.log('Learn modal open')}
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
                            <div
                                className="inline-block
                                max-h-[70vh]
                                w-full
                                max-w-lg
                                transform
                                overflow-y-auto
                                rounded-2xl
                                bg-white
                                px-2
                                py-3
                                text-left
                                align-middle
                                shadow-xl
                                transition-all"
                            >
                                {isLoading ? (
                                    <Spinner
                                        className={
                                            'flex items-center justify-center'
                                        }
                                        size={'150px'}
                                    />
                                ) : (
                                    <>
                                        <div className="px-6 py-4 align-middle">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-center font-poppins text-2xl font-extrabold"
                                            >
                                                {title}
                                            </Dialog.Title>
                                        </div>
                                        <div className="px-6 py-4">
                                            {children}
                                        </div>
                                    </>
                                )}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default LearnModal
