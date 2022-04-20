import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
} from 'react'

const s = require('./SuperRadio.module.css')

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
        ? options.map((o, i) => (
              <label key={name + '-' + i}>
                  <input
                      type={'radio'}
                      name={name}
                      value={o}
                      checked={value === o}
                      onChange={onChangeCallback}
                      {...restProps}
                  />
                  {o}
              </label>
          ))
        : []

    return <div className={s.radioButtons__list}>{mappedOptions}</div>
}

export default Radio
