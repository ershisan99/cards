const KEY = 'redux'

export function loadState() {
    try {
        const serializedState = localStorage.getItem(KEY)
        if (!serializedState) return undefined
        const state = JSON.parse(serializedState)
        state.user = { isLoading: true }
        return state
    } catch (e) {
        return undefined
    }
}

export async function saveState(state: any) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(KEY, serializedState)
    } catch (e) {
        // Ignore
    }
}

export async function clearState() {
    try {
        localStorage.clear()
    } catch (e) {
        console.error(e)
    }
}
