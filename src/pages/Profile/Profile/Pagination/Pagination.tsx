import React, { useState } from 'react'
import Select from '../../../../components/Select'
import left from './../../../../assets/leftArr.svg'
import right from './../../../../assets/rightArr.svg'

type PaginationPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    onPageChanged: (page: number) => void
    portionSize?: number
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
        const [portionNumber, setPortionNumber] = useState<number>(1)

        const onBackClickHandler = () => setPortionNumber(portionNumber - 1)
        const onForwardClickHandler = () => setPortionNumber(portionNumber + 1)

        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        let rightPortionPageNumber = portionNumber * portionSize
        return (
            <div className="my-2 flex w-auto items-center p-2 text-xs">
                {portionNumber > 1 && (
                    <button className={'mr-2'} onClick={onBackClickHandler}>
                        <img src={left} alt="left arrow" />
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
                                ? 'pagination-btn__active'
                                : 'pagination-btn'

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
                    <button className="ml-2" onClick={onForwardClickHandler}>
                        <img src={right} alt="left arrow" />
                    </button>
                )}
                <div className="ml-2">
                    <span>Show</span>
                    <Select options={arr} />
                    <span className="ml-2">Card per page</span>
                </div>
            </div>
        )
    }
)
