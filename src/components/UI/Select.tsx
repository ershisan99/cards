import React, {
    ChangeEvent,
    DetailedHTMLProps,
    SelectHTMLAttributes,
} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>
type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: Array<number>
    onChangeOption?: (value: number) => void
}

const Select: React.FC<SuperSelectPropsType> = ({
    options,
    onChange,
    onChangeOption,
    ...restProps
}) => {
    const mappedOptions: DefaultSelectPropsType[] = options
        ? options.map((o, i) => <option key={o + '-' + i}>{o}</option>)
        : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOption && onChangeOption(+e.currentTarget.value)
        onChange && onChange(e)
    }

    return (
        <select
            onChange={onChangeCallback}
            {...restProps}
            className="ml-2 h-auto w-auto cursor-pointer rounded border p-1 transition hover:border-primary "
        >
            {mappedOptions}
        </select>
    )
}

export default Select
