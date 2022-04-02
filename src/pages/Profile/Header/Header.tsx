import Tabs from './Tabs/Tabs'

type HeaderPropsType = {
    tabs: boolean
    onTabClickHandler: (value: boolean) => void
}

const Header: React.FC<HeaderPropsType> = ({ onTabClickHandler, tabs }) => {
    return (
        <div className="h-14 w-full bg-pink-50 font-poppins">
            <div className="mx-auto flex h-14 w-4/6 justify-between ">
                <div className="flex grow-0 items-center">
                    <span className="w-40 text-2xl font-semibold text-gray-800">
                        It-incubator
                    </span>
                </div>
                <div className="flex grow items-center">
                    <Tabs tabs={tabs} onTabClickHandler={onTabClickHandler} />
                </div>
            </div>
        </div>
    )
}

export default Header
