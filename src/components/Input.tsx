import React, { FC } from 'react'

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    alias: string
}

const Input: FC<PropsType> = ({ className, alias, children, ...rest }) => {
    return (
        <div className="group relative z-0 mb-6 w-full">
            <input
                className={`peer block w-full appearance-none border-0 border-b border-light-gray bg-transparent py-2.5 px-0 text-sm text-slate opacity-20 focus:border-primary focus:opacity-80 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-light dark:focus:border-blue-500 ${className}`}
                placeholder=" "
                name={alias}
                {...rest}
            />
            <label
                htmlFor={alias}
                className="pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-normal text-light-gray opacity-50 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
                {children}
            </label>
        </div>
    )
}

export default Input
