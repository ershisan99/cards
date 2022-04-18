import React, { FC } from 'react'
import Header from './Header'

const Layout: FC = ({ children }) => {
    return (
        <div className="h-full min-h-screen w-full bg-gradient">
            <Header />
            {children}
        </div>
    )
}

export default Layout
