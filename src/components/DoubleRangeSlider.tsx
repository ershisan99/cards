import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
type SuperDoubleRangePropsType = DefaultInputPropsType & {
    onChangeRange: (value: number | number[]) => void
    defaultValue?: [number, number]
    disable?: boolean
    min?: number
    max?: number
    step?: number
    value?: number[]
}

const RangeSlider: React.FC<SuperDoubleRangePropsType> = ({
    onChangeRange,
    defaultValue,
    disable,
    min,
    max,
    step,
    value,
}) => {
    return (
        <>
            <Slider
                range
                min={min}
                max={max}
                step={step}
                allowCross={disable}
                defaultValue={defaultValue}
                value={value}
                onChange={onChangeRange}
                tabIndex={max}
                pushable={false}
                railStyle={{ backgroundColor: '#9a91c8' }}
                trackStyle={{ backgroundColor: '#21268f' }}
                handleStyle={[
                    {
                        top: '1px',
                        padding: '2px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#ffffff',
                        border: '5px solid #21268f',
                    },
                    {
                        top: '1px',
                        padding: '2px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#ffffff',
                        border: '5px solid #21268f',
                    },
                ]}
            />
        </>
    )
}

export default RangeSlider
