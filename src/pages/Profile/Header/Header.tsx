import Tabs from '../../../components/Tabs'

type HeaderPropsType = {
    onTabClickHandler: () => void
}

const Header: React.FC<HeaderPropsType> = ({ onTabClickHandler }) => {
    return (
        <div className="h-14 w-full border border-amber-600 bg-pink-50 font-poppins">
            <div className="mx-auto flex h-14 w-4/6 justify-between ">
                <div className="flex grow-0 items-center  border border-red-600">
                    <span className="w-40 text-2xl font-semibold text-gray-800">
                        It-incubator
                    </span>
                </div>
                <div className="flex grow items-center border border-blue-500">
                    <Tabs onTabClickHandler={onTabClickHandler} />
                </div>
            </div>
        </div>
    )
}

export default Header
