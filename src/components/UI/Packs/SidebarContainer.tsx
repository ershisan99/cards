import React, { FC } from 'react'
import CardsSlider from './CardsSlider'

const SidebarContainer: FC = ({ children }) => {
    return (
        <div className="flex w-64 shrink-0 grow flex-col bg-light">
            {children}
            <CardsSlider />
        </div>
    )
}

export default SidebarContainer
