import React from 'react'
import search from '../../../../../assets/images/search.svg'

const Search = () => {
    return (
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
    )
}

export default Search
