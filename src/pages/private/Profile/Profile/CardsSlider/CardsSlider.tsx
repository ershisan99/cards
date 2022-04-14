import React, { useEffect, useState } from 'react'
import RangeSlider from '../../../../../components/UI/DoubleRangeSlider'

const STEP_VALUE: number = 1
const ALLOW_CROSS: boolean = false

type CardsSliderPropsType = {
    maxCardsCount: number
    minCardsCount: number
}

const CardsSlider: React.FC<CardsSliderPropsType> = ({
    maxCardsCount,
    minCardsCount,
}) => {
    const [value1, setValue1] = useState<number | number[]>(minCardsCount)
    const [value2, setValue2] = useState<number | number[]>(maxCardsCount)
    const [values, setValues] = useState<any>([value1, value2])

    useEffect(() => {
        setValues([value1, value2])
    }, [value1, value2])

    const onChangeRangeSecondHandler = (value: number | number[]) => {
        setValues(value)
    }
    return (
        <div className="h-50 p-6">
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
                    value={values}
                    onChangeRange={onChangeRangeSecondHandler}
                />
            </div>
        </div>
    )
}

export default CardsSlider
