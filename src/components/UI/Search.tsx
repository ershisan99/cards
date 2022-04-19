import React from 'react'
import { useSearchParams } from 'react-router-dom'
import clearIcon from '../../assets/images/clearIcon.svg'
import searchIcon from '../../assets/images/search.svg'
import { packsActions } from '../../state/slices/packsSlice'
import { useActions } from '../../utils/helpers'

const Search = () => {
    const { updatedSearch } = useActions(packsActions)
    const [searchParams, setSearchParams] = useSearchParams()
    const searchValue = searchParams.get('search')
    const resetSearch = () => {
        delete searchParamsObject.search
        setSearchParams({ ...searchParamsObject })
        updatedSearch({ search: '' })
    }
    const setSearch = (search: string) =>
        setSearchParams({ ...searchParamsObject, search })
    const searchParamsObject = Object.fromEntries(searchParams)
    const searchHandler = (value: string) => {
        if (value) setSearch(value)
        else resetSearch()
    }
    return (
        <div className="relative grow">
            <img
                className="absolute top-2.5 left-2"
                src={searchIcon}
                alt="search icon"
            />
            <input
                className="w-full rounded-sm border bg-light py-2 px-8 text-xs outline-0 transition-all hover:border-secondary focus:border-secondary"
                type="text"
                placeholder="Search..."
                value={searchValue || ''}
                onChange={(e) => searchHandler(e.currentTarget.value)}
            />
            <img
                className="absolute top-2.5 right-2 cursor-pointer"
                onClick={resetSearch}
                src={clearIcon}
                alt="search icon"
            />
        </div>
    )
}

export default Search
