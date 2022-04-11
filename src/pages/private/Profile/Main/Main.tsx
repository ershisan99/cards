import CardsSlider from '../Profile/CardsSlider/CardsSlider'
import Search from '../Profile/Search/Search'
import Table from '../Profile/Table/Table'
import { Pagination } from '../Profile/Pagination/Pagination'
import React, { useState } from 'react'

const Main = () => {
    // temporary state
    const [activeButton, setActiveButton] = useState<'all' | 'my'>('all')

    const changeActiveButton = () => {
        activeButton === 'all' ? setActiveButton('my') : setActiveButton('all')
    }

    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-b-xl">
                <div className="w-64 bg-light">
                    <div className="p-6">
                        <h3 className="text-base font-semibold">
                            Show packs cards
                        </h3>
                        <div className="mt-2 flex flex-row items-center justify-center p-0">
                            <button
                                className={
                                    activeButton === 'my'
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={changeActiveButton}
                            >
                                My
                            </button>
                            <button
                                className={
                                    activeButton === 'all'
                                        ? 'w-full bg-secondary px-6 py-1.5  text-white'
                                        : 'w-full bg-white px-6 py-1.5'
                                }
                                onClick={changeActiveButton}
                            >
                                All
                            </button>
                        </div>
                    </div>

                    <CardsSlider />
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="font-poppins text-xl font-semibold">
                        My pack list
                    </h2>
                    <Search />
                    <Table />
                    <Pagination
                        currentPage={1}
                        pageSize={10}
                        totalUsersCount={1000}
                        onPageChanged={() => alert('changed')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Main
