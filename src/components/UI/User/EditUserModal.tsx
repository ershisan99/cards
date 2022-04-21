import React, { ChangeEvent, useCallback, useState } from 'react'
import Button from '../../../components/UI/Button'
import CardModal from '../../../components/UI/CardChangeModal'
import Input from '../../../components/UI/Input'
import { selectUser, userThunks } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'

const AddPackModal = () => {
    const { user } = useAppSelector(selectUser)
    const { editMe } = useActions(userThunks)
    const [name, setName] = useState(user?.name || '')
    const [avatar, setAvatar] = useState(user?.avatar || '')
    const [open, setOpen] = useState<boolean>(false)
    const toggleOpen = () => setOpen(!open)

    const submitNewUserDataHandler = () => {
        editMe({ name, avatar }).then(() => setOpen(false))
    }

    const onNameChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value)
        },
        []
    )
    const onAvatarChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setAvatar(e.currentTarget.value)
        },
        []
    )

    return (
        <div>
            <button
                className="w-20 rounded border border-slate p-1 text-xs font-bold text-primary"
                onClick={toggleOpen}
            >
                Edit profile
            </button>
            <CardModal
                isOpen={open}
                setIsOpen={toggleOpen}
                title={'Edit profile'}
            >
                <Input
                    alias={'User name'}
                    className="my-6"
                    value={name}
                    onChange={onNameChangeHandler}
                >
                    Name
                </Input>
                <Input
                    alias={'Avatar'}
                    className="my-6"
                    value={avatar}
                    onChange={onAvatarChangeHandler}
                >
                    Avatar
                </Input>

                <div className="my-4 flex justify-between">
                    <Button
                        className="w-1/3"
                        color={'secondary'}
                        onClick={toggleOpen}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-1/3"
                        color={'primary'}
                        onClick={submitNewUserDataHandler}
                    >
                        Save
                    </Button>
                </div>
            </CardModal>
        </div>
    )
}

export default AddPackModal
