import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { selectUser } from '../../../state/slices/UserSlice'
import { useAppSelector } from '../../../utils/helpers'

const AllCardsSwitch = () => {
    const { user } = useAppSelector(selectUser)
    const [searchParams, setSearchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    return (
        <div className="p-6">
            <h3 className="text-base font-semibold">Show packs</h3>
            <div className="mt-2 flex flex-row items-center justify-center p-0">
                <button
                    className={
                        userId
                            ? 'w-full bg-secondary px-6 py-1.5  text-white'
                            : 'w-full bg-white px-6 py-1.5'
                    }
                    onClick={() =>
                        setSearchParams({
                            ...Object.fromEntries(searchParams),
                            userId: user!._id,
                        })
                    }
                >
                    My
                </button>
                <button
                    className={
                        !userId
                            ? 'w-full bg-secondary px-6 py-1.5  text-white'
                            : 'w-full bg-white px-6 py-1.5'
                    }
                    onClick={() => {
                        const searchParamsObj = Object.fromEntries(searchParams)
                        delete searchParamsObj.userId
                        setSearchParams({
                            ...searchParamsObj,
                        })
                    }}
                >
                    All
                </button>
            </div>
        </div>
    )
}

export default AllCardsSwitch
