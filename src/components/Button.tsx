import clsx from 'clsx'
import React from 'react'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary' | 'warning'
    className?: string
}

const Button: React.FC<PropsType> = ({
    children,
    color,
    className,
    ...rest
}) => {
    return (
        <button
            className={clsx(
                'rounded-full py-buttony font-medium',
                {
                    'bg-primary text-light': color === 'primary',
                    'bg-light-purple text-primary': color === 'secondary',
                    'bg-warning text-light': color === 'warning',
                },
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
