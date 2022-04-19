import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router'
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
    }, [page, pageCount, minCardsCount, maxCardsCount])

    return (
        <PacksContainer title={`${user.name}'s packs`}>
            <UserProfile username={user.name} email={user.email} />
        </PacksContainer>
    )
}
export default Profile
