import React, { FC } from 'react'
import CardsSlider from './CardsSlider/CardsSlider'
import { Pagination } from './Pagination/Pagination'
import Search from './Search/Search'
import Table from './Table/Table'
import UserProfile from './UserProfile/UserProfile'

const Profile: FC = () => {
    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
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
export default Profile
