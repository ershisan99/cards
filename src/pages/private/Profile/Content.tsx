import { useState } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import Profile from './Profile/Profile'

export const Content = () => {
    const [tabs, setTabs] = useState(true)
    const onTabClickHandler = (value: boolean) => setTabs(value)

    return (
        <div className="h-full min-h-screen w-full bg-gradient">
            <Header tabs={tabs} onTabClickHandler={onTabClickHandler} />
            {tabs ? <Profile /> : <Main />}
        </div>
    )
}
