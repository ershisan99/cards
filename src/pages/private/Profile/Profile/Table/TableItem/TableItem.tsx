import React from 'react'
import Button from '../../../../../../components/UI/Button'

type TabItemType = {
    name: string
    cards: number
    lastUpdated: string
    createdDay: string
    index: number
}

const TableItem: React.FC<TabItemType> = ({
    name,
    cards,
    lastUpdated,
    createdDay,
    index,
}) => {
    const tabBgStyle = {
        backgroundColor: index % 2 !== 0 ? '#ececf9' : 'transparent',
    }

    return (
        <>
            <tr style={tabBgStyle}>
                <td className="px-4 py-3">{name}</td>
                <td className="px-4 py-3">{cards}</td>
                <td className="px-4 py-3">{lastUpdated}</td>
                <td className="px-4 py-3">{createdDay}</td>
                <td className="px-4 py-3">
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
