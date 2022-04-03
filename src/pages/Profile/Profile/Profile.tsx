import Table from './Table/Table'
import { Pagination } from './Pagination/Pagination'
import React from 'react'
import CardsSlider from './CardsSlider/CardsSlider'
import Search from './Search/Search'
import UserProfile from './UserProfile/UserProfile'

export const Profile = () => {
    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-b-xl">
                <div className="w-64 bg-light">
                    <UserProfile
                        username={'Ivan Ivanov'}
                        work={'Front-end developer'}
                    />
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
