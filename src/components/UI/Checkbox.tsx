import React, { FC } from 'react'

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    alias: string
}

const Input: FC<PropsType> = ({ className, alias, children, ...rest }) => {
    return (
        <div className="group relative z-0 mb-6 w-full">
            <input
                name={alias}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                {...rest}
            />
            <label
                htmlFor={alias}
                className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {children}
            </label>
        </div>
    )
}

export default Input
