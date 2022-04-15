import React, { CSSProperties } from 'react'

type PropsType = {
    className?: string
    style?: CSSProperties
    size: string
}

export const Spinner = ({ className, style, size }: PropsType) => {
    return (
        <div className={className} style={style}>
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width={size}
                height={size}
                viewBox="0 0 150 150"
                enableBackground="new 0 0 150 150"
            >
                <g opacity="0.95">
                    <circle fill="#21268f" cx="56.752" cy="57.16" r="12" />
                    <circle fill="#21268f" cx="93.703" cy="57.16" r="12" />
                    <circle fill="#21268f" cx="93.703" cy="93.764" r="12" />
                    <circle fill="#21268f" cx="56.926" cy="93.764" r="12" />
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 75 75"
                        to="360 75 75"
                        dur="1.2s"
                        repeatCount="indefinite" //indefinite
                    />
                </g>
            </svg>
        </div>
    )
}
