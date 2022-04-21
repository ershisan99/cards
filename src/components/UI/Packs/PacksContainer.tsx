import React, { FC } from 'react'
import { packsActions, selectPacks } from '../../../state/slices/packsSlice'
import { useActions, useAppSelector } from '../../../utils/helpers'
import { Pagination } from '../Pagination'
import Search from '../Search'
import AddPackModal from './AddPackModal'
import PacksTable from './PacksTable'
import SidebarContainer from './SidebarContainer'

type Props = {
    title: string
}

const PacksContainer: FC<Props> = ({ children, title }) => {
    const { cardPacksTotalCount, page, pageCount } = useAppSelector(selectPacks)
    const { updatedPage, updatedPageCount } = useActions(packsActions)
    const onPageChange = (page: number) => {
        updatedPage({ page })
    }
    const onItemsPerPageChange = (pageCount: number) => {
        updatedPageCount({ pageCount })
    }
    return (
        <div className="h-full pt-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <SidebarContainer>{children}</SidebarContainer>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 text-xl font-semibold">{title}</h2>
                    <div className="flex justify-between">
                        <Search />
                        <AddPackModal />
                    </div>
                    <PacksTable />
                    <Pagination
                        totalItemsCount={cardPacksTotalCount}
                        currentPage={page}
                        itemsPerPage={pageCount}
                        onPageChange={onPageChange}
                        onItemsPerPageChange={onItemsPerPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default PacksContainer
