import React, { FC } from 'react'
import clearIcon from '../../assets/images/clearIcon.svg'
import searchIcon from '../../assets/images/search.svg'

type Props = {
    value: string
    searchHandler: (search: string) => void
    resetSearch: () => void
}

const Search: FC<Props> = ({ value, searchHandler, resetSearch }) => {
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
                value={value}
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
