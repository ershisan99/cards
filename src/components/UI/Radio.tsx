import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: Array<string>
    onChangeOption?: (option: string) => void
}

const Radio: React.FC<SuperRadioPropsType> = ({
    type,
    name,
    options,
    value,
    onChange,
    onChangeOption,
    checked,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value)
        onChange && onChange(e)
    }

    const mappedOptions: DefaultRadioPropsType[] = options
        ? options.map((option, index) => (
              <label key={name + '-' + index} className="my-1">
                  <input
                      type={'radio'}
                      name={name}
                      value={option}
                      checked={value === index + 1}
                      onChange={onChangeCallback}
                      {...restProps}
                  />
                  <span className="cursor-pointer p-2">{option}</span>
              </label>
          ))
        : []

    return <div className="flex flex-col justify-between">{mappedOptions}</div>
}

export default Radio
