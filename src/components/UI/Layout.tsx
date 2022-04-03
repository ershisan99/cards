import React, { FC, useState } from 'react'
import Header from '../../pages/private/Profile/Header/Header'

const Layout: FC = ({ children }) => {
    const [tabs, setTabs] = useState(true)
    const onTabClickHandler = (value: boolean) => setTabs(value)
    return (
        <>
            <Header tabs={tabs} onTabClickHandler={onTabClickHandler} />
            {children}
        </>
    )
}

export default Layout
