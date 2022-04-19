import React, { FC } from 'react'
import { Pagination } from '../Pagination'
import Search from '../Search'
import AddPackModal from './AddPackModal'
import PacksTable from './PacksTable'
import SidebarContainer from './SidebarContainer'

type Props = {
    title: string
}

const PacksContainer: FC<Props> = ({ children, title }) => {
    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <SidebarContainer>{children}</SidebarContainer>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 font-poppins text-xl font-semibold">
                        {title}
                    </h2>
                    <div className="flex justify-between">
                        <Search />
                        <AddPackModal />
                    </div>
                    <PacksTable />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default PacksContainer
