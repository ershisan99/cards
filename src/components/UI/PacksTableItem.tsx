import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { packsThunks } from '../../state/slices/packsSlice'
import { selectUser } from '../../state/slices/UserSlice'
import { useActions, useAppSelector } from '../../utils/helpers'
import Button from './Button'
import CardModal from './CardChangeModal'

type TabItemType = {
    name: string
    cards: number
    lastUpdated: Date
    createdBy: string
    index: number
    id: string
    user_id: string
}

const PackTableItem: React.FC<TabItemType> = ({
    name,
    cards,
    lastUpdated,
    createdBy,
    index,
    id,
    user_id,
}) => {
    const tabBgStyle = {
        backgroundColor: index % 2 !== 0 ? '#ececf9' : 'transparent',
    }

    const [deleteCardPack, setDeleteCardPack] = useState<boolean>(false)
    const { deletePack, getPacks } = useActions(packsThunks)
    const { user } = useAppSelector(selectUser)
    const deleteCardPackHandler = useCallback(() => {
        deletePack({ id }).then(() => getPacks({}))
        setDeleteCardPack(false)
    }, [])

    const onDeleteCardPackHandler = () => setDeleteCardPack(!deleteCardPack)

    const date = new Date(lastUpdated)
    const transformDate = `${date.getDate()}.${
        date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth()
    }.${date.getFullYear()}`

    return (
        <>
            <CardModal
                isOpen={deleteCardPack}
                setIsOpen={onDeleteCardPackHandler}
                title={'Delete pack'}
            >
                <div className="my-5">
                    Do you really want to remove <b>{name}</b>? All cards will
                    be excluded from this course.
                </div>
                <div className="my-4 flex justify-between">
                    <Button
                        className="w-1/3"
                        color={'secondary'}
                        onClick={onDeleteCardPackHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-1/3"
                        color={'warning'}
                        onClick={() => deleteCardPackHandler()}
                    >
                        Delete
                    </Button>
                </div>
            </CardModal>
            <tr style={tabBgStyle}>
                <td className="w-48 px-4 py-2">{name}</td>
                <td className="w-20 px-4 py-2">{cards}</td>
                <td className="w-20 px-4 py-2">{transformDate}</td>
                <td className="text-ellipsis px-4 py-2">{createdBy}</td>
                <td className="flex w-52 justify-end px-4 py-2">
                    {user._id === user_id && (
                        <>
                            <Button
                                className={'ml-1 rounded px-2'}
                                color={'warning'}
                                onClick={onDeleteCardPackHandler}
                            >
                                Delete
                            </Button>

                            <Button
                                className={'ml-1 rounded px-2'}
                                color={'secondary'}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                    <Link to={`/pack/${id}`}>
                        <Button
                            className={'ml-1 rounded px-2'}
                            color={'secondary'}
                        >
                            Learn
                        </Button>
                    </Link>
                </td>
            </tr>
        </>
    )
}

export default PackTableItem
