import React from 'react'
import { Provider } from 'react-redux'
import AppRouter from './components/BLL/AppRouter'
import { store } from './state/store'
import { saveState } from './utils/localstorage'

store.subscribe(() => saveState(store.getState()))

function App() {
    return (
        <div>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </div>
    )
}

export default App
