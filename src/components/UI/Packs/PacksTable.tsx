import React from 'react'
import { packsActions, selectPacks } from '../../../state/slices/packsSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'
import { Spinner } from '../Spinner'
import { triangle } from '../Triangle'
import TableItem from './PacksTableItem'

const PacksTable: React.FC = () => {
    const { isLoading, cardPacks, sortPacks } = useAppSelector(selectPacks)
    const { updatedSortPacks } = useActions(packsActions)

    const sortSendValue = (value: string) => {
        if (value === 'NAME') {
            sortPacks === '0name'
                ? updatedSortPacks({ sortPacks: '1name' })
                : updatedSortPacks({ sortPacks: '0name' })
        }
        if (value === 'CARDS') {
            sortPacks === '0cardsCount'
                ? updatedSortPacks({ sortPacks: '1cardsCount' })
                : updatedSortPacks({ sortPacks: '0cardsCount' })
        }
        if (value === 'LAST') {
            sortPacks === '0updated'
                ? updatedSortPacks({ sortPacks: '1updated' })
                : updatedSortPacks({ sortPacks: '0updated' })
        }
        if (value === 'CREATED_BY') {
            sortPacks === '0user_name'
                ? updatedSortPacks({ sortPacks: '1user_name' })
                : updatedSortPacks({ sortPacks: '0user_name' })
        }
    }

    return (
        <>
            <div className="mt-6 h-fit rounded text-xs shadow-md">
                <table className="w-full">
                    <thead className="bg-light p-2 text-left font-medium">
                        <tr>
                            <th
                                className="cursor-pointer px-4 py-4"
                                onClick={() => sortSendValue('NAME')}
                            >
                                <div className="flex flex-row items-center">
                                    Name
                                    {sortPacks === '0name' && triangle('down')}
                                    {sortPacks === '1name' && triangle('up')}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-4 py-3"
                                onClick={() => sortSendValue('CARDS')}
                            >
                                <div className="flex flex-row items-center">
                                    Cards
                                    {sortPacks === '0cardsCount' &&
                                        triangle('down')}
                                    {sortPacks === '1cardsCount' &&
                                        triangle('up')}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-4 py-3 "
                                onClick={() => sortSendValue('LAST')}
                            >
                                <div className="flex flex-row items-center">
                                    Last
                                    {sortPacks === '0updated' && triangle('up')}
                                    {sortPacks === '1updated' &&
                                        triangle('down')}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-4 py-3"
                                onClick={() => sortSendValue('CREATED_BY')}
                            >
                                <div className="flex flex-row items-center">
                                    Created by
                                    {sortPacks === '0user_name' &&
                                        triangle('up')}
                                    {sortPacks === '1user_name' &&
                                        triangle('down')}
                                </div>
                            </th>
                            <th className="cursor-pointer px-4 py-3">
                                Actions
                            </th>
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
