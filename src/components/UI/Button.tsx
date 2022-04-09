import clsx from 'clsx'
import React from 'react'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary' | 'warning'
    className?: string
    disabled?: boolean
}

const Button: React.FC<PropsType> = ({
    children,
    color,
    className,
    disabled,
    ...rest
}) => {
    return (
        <button
            className={clsx(
                'rounded-full py-buttony font-medium disabled:opacity-60',
                {
                    'bg-primary text-light': color === 'primary',
                    'bg-light-purple text-primary': color === 'secondary',
                    'bg-warning text-light': color === 'warning',
                },
                className
            )}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
