import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import CardsSlider from '../../../components/UI/CardsSlider'
import Table from '../../../components/UI/PacksTable'
import { Pagination } from '../../../components/UI/Pagination'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../../state/slices/packsSlice'

import { selectUser } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'

const Profile: FC = () => {
    const { user } = useAppSelector(selectUser)
    const { getPacks, updatedSearch } = useActions({
        ...packsThunks,
        ...packsActions,
    })
    const { page, pageCount, minCardsCount, maxCardsCount } =
        useAppSelector(selectPacks)
    const { userId } = useParams()
    const [urlSearch] = useSearchParams()
    const debouncedSearch = urlSearch.get('search')
    const debouncedState = useDebounce(debouncedSearch, 1500)
    useEffect(() => {
        updatedSearch({ search: debouncedState || '' })
    }, [debouncedState])
    useEffect(() => {
        getPacks({ user_id: userId })
    }, [page, pageCount, minCardsCount, maxCardsCount, debouncedState])

    return (
        <div className="h-full py-6">
            <div className="mx-auto flex h-3/4 w-4/6 overflow-hidden rounded-xl">
                <div className="w-64 bg-light">
                    <UserProfile username={user.name} email={user.email} />
                    <CardsSlider />
                </div>
                <div className="w-full bg-white px-12 py-6">
                    <h2 className="mb-6 font-poppins text-xl font-semibold">
                        My card packs
                    </h2>
                    {/*<Search />*/}
                    <Table />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}
type UserProfileType = {
    username: string
    email: string
    avatar?: string
}

const UserProfile: React.FC<UserProfileType> = ({
    username,
    email,
    avatar,
}) => {
    return (
        <div className="bg- flex flex-col items-center rounded-b-md bg-light-purple py-6 px-6">
            <div className="h-24 w-24 overflow-hidden rounded-full">
                <img
                    src={
                        avatar ||
                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                    }
                    alt="user avatar"
                />
            </div>
            <h3 className="text-lg font-semibold">{username}</h3>
            <p className="py-2 text-sm text-slate ">{email}</p>
            <button className="w-20 rounded border border-slate p-1 text-xs font-bold text-primary">
                Edit profile
            </button>
        </div>
    )
}
export default Profile
