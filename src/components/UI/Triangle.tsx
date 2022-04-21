import React from 'react'

export const triangle = (mode: 'up' | 'down') => {
    if (mode === 'up') {
        return (
            <div
                style={{
                    width: '0',
                    height: '0',
                    margin: '0 0 0 5px',
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: '10px solid #555',
                }}
            />
        )
    }
    if (mode === 'down') {
        return (
            <div
                style={{
                    width: '0',
                    height: '0',
                    margin: '0 0 0 5px',
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '10px solid #555',
                }}
            />
        )
    }
}
