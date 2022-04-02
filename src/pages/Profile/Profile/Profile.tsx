import search from './../../../assets/search.svg'
import Table from './Table/Table'
import { Pagination } from './Pagination/Pagination'
import React from 'react'

type ProfileType = {
    username: string
    work: string
    avatar?: string
}

export const Profile: React.FC<ProfileType> = ({ username, work, avatar }) => {
    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-b-xl">
                <div className="w-64 bg-light">
                    <div className="flex flex-col items-center rounded-b-md bg-secondary py-2 px-6">
                        <div className="h-24 w-24 overflow-hidden rounded-full">
                            <img
                                src={
                                    avatar
                                        ? avatar
                                        : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                                }
                                alt="user avatar"
                            />
                        </div>
                        <h3 className="text-lg font-semibold">{username}</h3>
                        <p className="py-2 text-sm text-slate ">{work}</p>
                        <button className="w-20 rounded border border-slate p-1 text-xs text-primary">
                            Edit profile
                        </button>
                    </div>

                    <div className="h-full p-6">
                        <h3 className="text-base font-semibold">
                            Number of cards
                        </h3>
                        <div>Slider</div>
                    </div>
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="font-poppins text-xl font-semibold">
                        My pack list
                    </h2>
                    <div className="relative">
                        <img
                            className="absolute top-8 left-2"
                            src={search}
                            alt="search icon"
                        />
                        <input
                            className="my-6 w-full rounded-sm border bg-light py-2 px-8 text-xs outline-0 transition-all hover:border-secondary focus:border-secondary"
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                    <Table />
                    <Pagination
                        currentPage={1}
                        pageSize={10}
                        totalUsersCount={100}
                        onPageChanged={() => alert('changed')}
                    />
                </div>
            </div>
        </div>
    )
}
