import { Profile } from './Profile/Profile'
import { useState } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'

export const Content = () => {
    const [tabs, setTabs] = useState(true)
    const onTabClickHandler = (value: boolean) => setTabs(value)

    return (
        <div className="h-screen w-full overflow-y-hidden bg-gradient">
            <Header tabs={tabs} onTabClickHandler={onTabClickHandler} />
            {tabs ? (
                <Profile
                    username={'Ivan Ivanov'}
                    work={'Front-end developer'}
                />
            ) : (
                <Main />
            )}
        </div>
    )
}
