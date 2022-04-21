import React, { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PacksContainer from '../../../components/UI/Packs/PacksContainer'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../../state/slices/packsSlice'

import { selectUser } from '../../../state/slices/UserSlice'
import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'
import UserProfile from './UserProfile'

const Profile: FC = () => {
    const { user } = useAppSelector(selectUser)
    const { getPacks, updatedSearch } = useActions({
        ...packsThunks,
        ...packsActions,
    })
    const { page, pageCount, sortPacks } = useAppSelector(selectPacks)

    const [urlSearch] = useSearchParams()
    const debouncedSearch = urlSearch.get('search')
    const userId = urlSearch.get('userId')
    const debouncedState = useDebounce(debouncedSearch, 1500)
    useEffect(() => {
        updatedSearch({ search: debouncedState || '' })
    }, [debouncedState])
    useEffect(() => {
        userId && getPacks({ user_id: userId })
    }, [page, pageCount, sortPacks, debouncedState])

    return (
        <PacksContainer title={`${user!.name}'s packs`}>
            {user && (
                <UserProfile
                    username={user.name}
                    email={user.email}
                    userId={userId || ''}
                    avatar={user.avatar}
                />
            )}
        </PacksContainer>
    )
}
export default Profile
