import React, { useState } from 'react'
import Select from '../../../../../components/UI/Select'

type PaginationPropsType = {
    currentPage: number
    pageSize: number
    cardPacksTotalCount: number
    onPageChanged: (page: number) => void
    portionSize: number
    onSelectChange?: (value: number) => void
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const Pagination: React.FC<PaginationPropsType> = React.memo(
    ({
        currentPage,
        pageSize,
        cardPacksTotalCount,
        onPageChanged,
        portionSize,
        onSelectChange,
    }) => {
        let pagesCount = Math.ceil(cardPacksTotalCount / pageSize)
        let pages: Array<number> = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        let portionCount = Math.ceil(pagesCount / portionSize)
        const [portionNumber, setPortionNumber] = useState<number>(1)

        const onBackClickHandler = () => setPortionNumber(portionNumber - 1)
        const onForwardClickHandler = () => setPortionNumber(portionNumber + 1)

        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        let rightPortionPageNumber = portionNumber * portionSize
        return (
            <div className="mt-5 flex w-auto items-center p-0 text-sm">
                {portionNumber > 1 && (
                    <button
                        className={
                            'pagination-btn rounded transition hover:text-white'
                        }
                        onClick={onBackClickHandler}
                    >
                        {'<'}
                    </button>
                )}

                {pages
                    .filter(
                        (p: number) =>
                            p >= leftPortionPageNumber &&
                            p <= rightPortionPageNumber
                    )
                    .map((page: number, i: number) => {
                        let currentPageClassName =
                            currentPage === page
                                ? 'pagination-btn__active rounded mx-0.5 transition'
                                : 'pagination-btn rounded mx-0.5 transition'

                        return (
                            <span
                                className={currentPageClassName}
                                key={i}
                                onClick={() => {
                                    onPageChanged(page)
                                }}
                            >
                                {page}
                            </span>
                        )
                    })}

                {portionCount > portionNumber && (
                    <button
                        className="pagination-btn rounded transition hover:text-white"
                        onClick={onForwardClickHandler}
                    >
                        {'>'}
                    </button>
                )}
                <div className="ml-2">
                    <span>Show</span>
                    <Select
                        options={arr}
                        value={portionSize}
                        onChangeOption={onSelectChange}
                    />
                    <span className="ml-2">Card per page</span>
                </div>
            </div>
        )
    }
)
