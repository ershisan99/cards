import React from 'react'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary' | 'warning'
}

const Button: React.FC<PropsType> = ({ children, color, ...rest }) => {
    let classes = ''
    switch (color) {
        case 'primary':
            classes = 'bg-primary'
            break
        case 'secondary':
            classes = 'bg-secondary text-primary'
            break
        case 'warning':
            classes = 'bg-warning'
            break
        default:
            break
    }
    return (
        <button
            className={
                'rounded-full px-buttonx py-buttony font-sf font-medium text-light' +
                ' ' +
                classes
            }
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
