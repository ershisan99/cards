import React, { useEffect, useState } from 'react'
import {
    packsActions,
    packsThunks,
    selectPacks,
} from '../../state/slices/packsSlice'
import { useActions, useAppSelector, useDebounce } from '../../utils/helpers'
import RangeSlider from './DoubleRangeSlider'

const STEP_VALUE = 1
const ALLOW_CROSS = false

const CardsSlider = () => {
    const [isFirstLoad, setFirstLoad] = useState(true)
    const { getPacks, updatedMinMax } = useActions({
        ...packsThunks,
        ...packsActions,
    })
    const { maxCardsCount, minCardsCount } = useAppSelector(selectPacks)
    const [values, setValues] = useState<number[]>([
        minCardsCount,
        maxCardsCount,
    ])
    const debouncedState = useDebounce(values, 2000)
    useEffect(() => {
        const [minCardsCount, maxCardsCount] = values
        updatedMinMax({ minCardsCount, maxCardsCount })
        setFirstLoad(false)
    }, [])

    useEffect(() => {
        if (!isFirstLoad) {
            if (debouncedState) {
                const [minCardsCount, maxCardsCount] = values
                updatedMinMax({ minCardsCount, maxCardsCount })
            }
            if (debouncedState === '') {
                getPacks({})
            }
        }
    }, [debouncedState])
    const onChangeRangeSecondHandler = (value: number | number[]) => {
        if (typeof value === 'number') setValues([value, value])
        if (typeof value !== 'number') setValues(value)
        console.log({ value, values })
    }
    return (
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
                    onChangeRange={onChangeRangeSecondHandler}
                />
            </div>
        </div>
    )
}

export default CardsSlider
