import React from 'react'
import Button from '../../../../../../components/UI/Button'

type TabItemType = {
    name: string
    cards: number
    lastUpdated: Date
    createdBy: string
    index: number
}

const TableItem: React.FC<TabItemType> = ({
    name,
    cards,
    lastUpdated,
    createdBy,
    index,
}) => {
    const tabBgStyle = {
        backgroundColor: index % 2 !== 0 ? '#ececf9' : 'transparent',
    }

    const date = new Date(lastUpdated)
    const transformDate = `${date.getDay()}.${
        date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth()
    }.${date.getFullYear()}`

    return (
        <>
            <tr style={tabBgStyle}>
                <td className="w-48 px-4 py-2">{name}</td>
                <td className="w-20 px-4 py-2">{cards}</td>
                <td className="w-20 px-4 py-2">{transformDate}</td>
                <td className="text-ellipsis px-4 py-2">{createdBy}</td>
                <td className="w-52 px-4 py-2">
                    <Button className={'ml-1 rounded px-2'} color={'warning'}>
                        Delete
                    </Button>
                    <Button className={'ml-1 rounded px-2'} color={'secondary'}>
                        Edit
                    </Button>
                    <Button className={'ml-1 rounded px-2'} color={'secondary'}>
                        Learn
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default TableItem
