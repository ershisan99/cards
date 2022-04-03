import cards from '../../../../../assets/images/cards.svg'
import user from '../../../../../assets/images/user.svg'

type TabsPropsType = {
    tabs: boolean
    onTabClickHandler: (value: boolean) => void
}

const Tabs: React.FC<TabsPropsType> = ({ onTabClickHandler, tabs }) => {
    const onMainClickHandler = () => {
        onTabClickHandler(false)
    }
    const onProfileClickHandler = () => {
        onTabClickHandler(true)
    }

    return (
        <div className="mx-auto flex h-14 w-80">
            <div
                className={!tabs ? 'tab-item__active' : 'tab-item'}
                onClick={onMainClickHandler}
            >
                <img className="ml-4" src={cards} alt="cards icon" />
                <span className="mx-1.5 text-sm font-thin">Packs list</span>
            </div>
            <div
                className={tabs ? 'tab-item__active' : 'tab-item'}
                onClick={onProfileClickHandler}
            >
                <img className="ml-6" src={user} alt="user icon" />
                <span className="mx-1.5 text-sm font-thin">Profile</span>
            </div>
        </div>
    )
}

export default Tabs
