import TableItem from './TableItem/TableItem'
import { CardsPackType } from '../../../../../API/cardsPackAPI'
import React from 'react'

type TablePropsType = {
    cardPacks: Array<CardsPackType>
}

const Table: React.FC<TablePropsType> = React.memo(({ cardPacks }) => {
    return (
        <div className="mt-6 h-fit rounded text-xs shadow-md">
            <table className="w-full">
                <thead className="bg-light p-2 text-left font-medium">
                    <tr>
                        <th className="px-4 py-4">Name</th>
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
                                createdBy={c.user_name}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
})

export default Table
