import TableItem from './TableItem/TableItem'
import { CardsPackType } from '../../../../../API/cardsPackAPI'
import React from 'react'

type DataType = {
    name: string
    cards: number
    lastUpdated: string
    createdBy: string
}

const data = [
    {
        name: 'Jack Daniels',
        cards: 3,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.01.2022',
    },
    {
        name: 'Bob Marley',
        cards: 2,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.09.2022',
    },
    {
        name: 'Curt Cobain',
        cards: 13,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.01.2022',
    },
    {
        name: 'Tris Merigold',
        cards: 33,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.11.2022',
    },
    {
        name: 'Michaele Jackson',
        cards: 5,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.01.2022',
    },
    {
        name: 'Freddy Mercury',
        cards: 7,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.01.2022',
    },
    {
        name: 'Tony Stark',
        cards: 11,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '12.12.2022',
    },
    {
        name: 'Natasha Romanov',
        cards: 32,
        createdBy: 'Ivan Ivanov',
        lastUpdated: '22.01.2022',
    },
] as Array<DataType>

type TablePropsType = {
    cardPacks: Array<CardsPackType>
}

const Table: React.FC<TablePropsType> = ({ cardPacks }) => {
    return (
        <div className="h-fit rounded text-xs shadow-md">
            <table className="w-full">
                <thead className="bg-light p-2 text-left font-medium">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Cards</th>
                        <th className="px-4 py-3">Last</th>
                        <th className="px-4 py-3">Created by</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cardPacks.map((c, i) => {
                        return (
                            <TableItem
                                key={i}
                                index={i}
                                name={c.name}
                                cards={c.cardsCount}
                                lastUpdated={c.updated}
                                createdDay={c.created}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
