import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../../state/slices/packsSlice'
import { useActions, useAppSelector, useDebounce } from '../../../utils/helpers'
import RangeSlider from '../DoubleRangeSlider'
import { Spinner } from '../Spinner'

const STEP_VALUE = 1
const ALLOW_CROSS = false

const CardsSlider = () => {
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [isSecondLoad, setSecondLoad] = useState(true)
    const { getPacks } = useActions({
        ...packsThunks,
        ...packsActions,
    })
    const { maxCardsCount, minCards, isLoading } = useAppSelector(selectPacks)
    const [values, setValues] = useState<number[]>([
        minCards || 0,
        maxCardsCount || 1000,
    ])
    const debouncedState = useDebounce(values, 2000)
    useEffect(() => {
        if (!isFirstLoad && !isSecondLoad) {
            userId
                ? getPacks({ user_id: userId, min: values[0], max: values[1] })
                : getPacks({ min: values[0], max: values[1] })
        }
        if (isFirstLoad) setFirstLoad(false)
        if (!isFirstLoad && isSecondLoad) setSecondLoad(false)
    }, [debouncedState])

    useEffect(() => {
        setValues([minCards!, maxCardsCount!])
    }, [maxCardsCount])
    useEffect(() => {
        if (!isFirstLoad) userId ? getPacks({ user_id: userId }) : getPacks({})
    }, [userId])

    const onChangeRangeSecondHandler = (value: number | number[]) => {
        if (typeof value === 'number') setValues([value, value])
        if (typeof value !== 'number') setValues(value)
        console.log({ value, values })
    }
    return (
        <>
            {isLoading ? (
                <Spinner size="50px" className="flex justify-center" />
            ) : (
                <div className="h-full p-6">
                    <h3 className="text-base font-semibold">Number of cards</h3>
                    <div>
                        <div className="relative mt-6 mb-4 flex justify-between text-xs">
                            <span className="w-9 rounded bg-primary py-1 text-center text-white">
                                {values[0]}
                            </span>
                            <span className="w-9 rounded bg-primary px-2 py-1 text-center text-white">
                                {values[1]}
                            </span>
                        </div>

                        <RangeSlider
                            step={STEP_VALUE}
                            disable={ALLOW_CROSS}
                            values={values}
                            min={0}
                            max={maxCardsCount}
                            onChangeRange={onChangeRangeSecondHandler}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default CardsSlider
