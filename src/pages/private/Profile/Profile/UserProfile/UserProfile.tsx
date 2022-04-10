import React from 'react'

type UserProfileType = {
    username: string
    work: string
    avatar?: string
}

const UserProfile: React.FC<UserProfileType> = ({ username, work, avatar }) => {
    return (
        <div className="bg- flex flex-col items-center rounded-b-md bg-light-purple py-6 px-6">
            <div className="h-24 w-24 overflow-hidden rounded-full">
                <img
                    src={
                        avatar
                            ? avatar
                            : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                    }
                    alt="user avatar"
                />
            </div>
            <h3 className="text-lg font-semibold">{username}</h3>
            <p className="py-2 text-sm text-slate ">{work}</p>
            <button className="w-20 rounded border border-slate p-1 text-xs font-bold text-primary">
                Edit profile
            </button>
        </div>
    )
}

export default UserProfile
