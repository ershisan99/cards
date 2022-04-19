import React, { FC, useState } from 'react'
import Select from './Select'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type PropsType = {
    totalItemsCount: number
    currentPage: number
    itemsPerPage: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (iterm: number) => void
}

export const Pagination: FC<PropsType> = ({
    totalItemsCount,
    currentPage,
    itemsPerPage,
    onItemsPerPageChange,
    onPageChange,
}) => {
    const pagesCount = Math.ceil(totalItemsCount / itemsPerPage)
    const pages: Array<number> = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / itemsPerPage)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const onPageChanged = (page: number) => {
        onPageChange(page)
    }
    const onSelectChange = (pageCount: number) => {
        onItemsPerPageChange(pageCount)
    }
    const onBackClickHandler = () => setPortionNumber(portionNumber - 1)
    const onForwardClickHandler = () => setPortionNumber(portionNumber + 1)
    const onStartClickHandler = () => setPortionNumber(1)
    const onEndClickHandler = () => setPortionNumber(portionCount)

    let leftPortionPageNumber = (portionNumber - 1) * 10 + 1
    let rightPortionPageNumber = portionNumber * 10
    return (
        <div className="mt-5 flex w-auto items-center p-0 text-sm">
            <button
                disabled={portionNumber <= 1}
                className={'pagination-btn rounded transition hover:text-white'}
                onClick={onStartClickHandler}
            >
                {'<<'}
            </button>
            <button
                disabled={portionNumber <= 1}
                className={'pagination-btn rounded transition hover:text-white'}
                onClick={onBackClickHandler}
            >
                {'<'}
            </button>

            {pages
                .filter(
                    (p: number) =>
                        p >= leftPortionPageNumber &&
                        p <= rightPortionPageNumber
                )
                .map((mpage: number, i: number) => {
                    let currentPageClassName =
                        currentPage === mpage
                            ? 'pagination-btn__active rounded mx-0.5 transition'
                            : 'pagination-btn rounded mx-0.5 transition'

                    return (
                        <span
                            className={currentPageClassName}
                            key={i}
                            onClick={() => {
                                onPageChanged(mpage)
                            }}
                        >
                            {mpage}
                        </span>
                    )
                })}
            <button
                disabled={portionCount <= portionNumber}
                className="pagination-btn rounded transition hover:text-white"
                onClick={onForwardClickHandler}
            >
                {'>'}
            </button>
            <button
                disabled={portionCount <= portionNumber}
                className="pagination-btn rounded transition hover:text-white"
                onClick={onEndClickHandler}
            >
                {'>>'}
            </button>
            <div className="ml-2">
                <span>Show</span>
                <Select
                    options={arr}
                    value={itemsPerPage}
                    onChangeOption={onSelectChange}
                />
                <span className="ml-2">items per page</span>
            </div>
        </div>
    )
}
