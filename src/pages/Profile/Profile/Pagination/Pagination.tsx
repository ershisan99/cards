import React, { useState } from 'react'

type PaginationPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    onPageChanged: (page: number) => void
    portionSize?: number
}

export const Pagination: React.FC<PaginationPropsType> = React.memo(
    ({
        currentPage,
        pageSize,
        totalUsersCount,
        onPageChanged,
        portionSize = 10,
    }) => {
        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages: Array<number> = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        let portionCount = Math.ceil(pagesCount / portionSize)
        let [portionNumber, setPortionNumber] = useState<number>(1)

        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        let rightPortionPageNumber = portionNumber * portionSize
        return (
            <div className="my-auto flex w-96 p-2">
                {portionNumber > 1 && (
                    <button
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                        }}
                    >
                        back
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
                            currentPage === page ? 'text-yellow-400' : ''

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
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                        }}
                    >
                        foward
                    </button>
                )}
            </div>
        )
    }
)
