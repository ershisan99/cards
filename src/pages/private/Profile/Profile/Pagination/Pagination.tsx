import React, { useState } from 'react'
import left from '../../../../../assets/images/leftArr.svg'
import right from '../../../../../assets/images/rightArr.svg'
import Select from '../../../../../components/UI/Select'

type PaginationPropsType = {
    currentPage: number
    pageSize: number
    cardPacksTotalCount: number
    onPageChanged: (page: number) => void
    portionSize?: number
    onSelectChange?: (value: number) => void
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const Pagination: React.FC<PaginationPropsType> = React.memo(
    ({
        currentPage,
        pageSize,
        cardPacksTotalCount,
        onPageChanged,
        portionSize = 10,
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
                    <Select
                        options={arr}
                        defaultValue={portionSize}
                        onChangeOption={onSelectChange}
                    />
                    <span className="ml-2">Card per page</span>
                </div>
            </div>
        )
    }
)
