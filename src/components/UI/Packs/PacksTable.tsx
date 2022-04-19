import React from 'react'
import { selectPacks } from '../../../state/slices/packsSlice'
import { useAppSelector } from '../../../utils/helpers'
import { Spinner } from '../Spinner'
import TableItem from './PacksTableItem'

const PacksTable: React.FC = () => {
    const { isLoading, cardPacks } = useAppSelector(selectPacks)
    return (
        <>
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="table-cell">
                                    <Spinner
                                        size={'100px'}
                                        className="flex w-full items-center justify-center"
                                    />
                                </td>
                            </tr>
                        ) : cardPacks.length > 0 ? (
                            cardPacks.map((c, i) => {
                                return (
                                    <TableItem
                                        key={i}
                                        index={i}
                                        name={c.name}
                                        cards={c.cardsCount}
                                        lastUpdated={c.updated}
                                        createdBy={c.user_name}
                                        user_id={c.user_id}
                                        id={c._id}
                                    />
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="table-cell">
                                    <span className="flex w-full justify-center py-4 text-2xl text-primary">
                                        No cards found!
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PacksTable
