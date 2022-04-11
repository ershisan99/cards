import React, { FC, KeyboardEvent } from 'react'

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    alias: string
    error?: boolean
    errorText?: string
    onKeyPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Input: FC<PropsType> = ({
    className,
    alias,
    error,
    children,
    errorText,
    onKeyPressEnter,
    ...rest
}) => {
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onKeyPressEnter) {
            onKeyPressEnter(e)
        }
    }

    return (
        <div className="group relative z-0 mb-6 w-full">
            <input
                className={`
                peer
                block
                w-full
                appearance-none
                
                border-0
                border-b
                bg-transparent
                py-2.5
                px-0
                text-sm
                text-slate
                opacity-20
                focus:border-primary
                focus:opacity-80
                focus:outline-none
                focus:ring-0
                dark:border-gray-600
                dark:text-light
                dark:focus:border-blue-500
                ${className}
                ${
                    error
                        ? 'border-red-600 bg-red-100 text-red-500 opacity-90 focus:border-red-600 focus:text-red-500'
                        : 'border-light-gray '
                }
                `}
                placeholder=" "
                name={alias}
                onKeyPress={(e) => onKeyPressHandler(e)}
                {...rest}
            />
            <label
                htmlFor={alias}
                className={`
                pointer-events-none
                absolute
                top-3
                z-10
                origin-[0]
                -translate-y-7
                scale-90
                transform
                text-sm
                font-normal
                text-light-gray
                opacity-50
                duration-300
                peer-placeholder-shown:translate-y-0
                peer-placeholder-shown:scale-100
                peer-focus:left-0
                peer-focus:-translate-y-8
                peer-focus:scale-90
                peer-focus:text-primary
                dark:text-gray-400
                peer-focus:dark:text-blue-500
                ${
                    error
                        ? 'text-red-600 focus:scale-90 focus:text-red-500 peer-focus:scale-90 peer-focus:text-red-500'
                        : ''
                }
                `}
            >
                {error ? errorText : children}
            </label>
        </div>
    )
}

export default Input
