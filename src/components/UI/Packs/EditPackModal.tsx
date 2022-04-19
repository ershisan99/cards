import React, { ChangeEvent, memo, useCallback, useState } from 'react'
import Button from '../Button'
import CardModal from '../CardChangeModal'
import Input from '../Input'

type PropsType = {
    isOpen: boolean
    titlePack: string
    changeMode: () => void
    savePackTitleCallback: (cardsPackName: string) => void
}

const EditPackModal = memo(
    ({ isOpen, changeMode, titlePack, savePackTitleCallback }: PropsType) => {
        const [packName, setPackName] = useState<string>(titlePack)

        const onInputChangeHandler = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setPackName(e.currentTarget.value)
            },
            []
        )

        const changeModeCallback = () => {
            changeMode()
        }

        const savePackTitle = () => {
            savePackTitleCallback(packName)
        }

        return (
            <React.Fragment>
                <CardModal
                    isOpen={isOpen}
                    setIsOpen={changeModeCallback}
                    title={'Edit pack'}
                >
                    <Input
                        alias={'Name pack'}
                        className="my-6"
                        value={packName}
                        onChange={(e) => onInputChangeHandler(e)}
                    >
                        Name pack
                    </Input>
                    <div className="my-4 flex justify-between">
                        <Button
                            className="w-1/3"
                            color={'secondary'}
                            onClick={changeModeCallback}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-1/3"
                            color={'primary'}
                            onClick={savePackTitle}
                        >
                            Save
                        </Button>
                    </div>
                </CardModal>
            </React.Fragment>
        )
    }
)
export default EditPackModal
