import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PacksContainer from '../../../components/UI/Packs/PacksContainer'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../../state/slices/packsSlice'
import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'
import AllCardsSwitch from './AllCardsSwitch'

const Packs = () => {
    const { page, pageCount, minCards, maxCards, sortPacks } =
        useAppSelector(selectPacks)
    const { getPacks, updatedSearch } = useActions({
        ...packsThunks,
        ...packsActions,
    })

    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const searchValue = searchParams.get('search')

    const debouncedState = useDebounce(searchValue, 1500)
    useEffect(() => {
        updatedSearch({ search: debouncedState || '' })
    }, [debouncedState])
    useEffect(() => {
        userId ? getPacks({ user_id: userId }) : getPacks({})
    }, [page, pageCount, minCards, maxCards, debouncedState, userId, sortPacks])
    return (
        <PacksContainer title="Packs list">
            <AllCardsSwitch />
        </PacksContainer>
    )
}

export default Packs
