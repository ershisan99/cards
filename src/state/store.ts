import {
    ActionCreatorsMapObject,
    bindActionCreators,
    configureStore,
} from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { signupReducer } from './slices/signUpSlice'

export const store = configureStore({
    reducer: { signup: signupReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type ActionCreatorResponse<T extends (...args: any[]) => any> =
    ReturnType<ReturnType<T>>
type IsValidArg<T> = T extends object
    ? keyof T extends never
        ? false
        : true
    : true
export type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
    ? IsValidArg<A> extends true
        ? (a: A) => TNewReturn
        : () => TNewReturn
    : never
export type RemapActionCreators<T extends ActionCreatorsMapObject> = {
    [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()
    return useMemo(
        () => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch),
        [actions, dispatch]
    )
}
