import { instance } from './instance'

export type SignInArgs = {
    email: string
    password: string
    rememberMe: boolean
}

export type MeRes = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

export type SignUpArgs = {
    email: string
    password: string
}
export type SignUpRes = {
    addedUser: any
    error?: string
}

export type ForgotArgs = {
    email: string // кому восстанавливать пароль
    from: string // от кого придёт письмо
    message: string // письмо, вместо $token$ бэк вставит токен. Пример:
    // `<div style="background-color: lime; padding: 15px">
    // password recovery link:
    // <a href='http://localhost:3000/#/set-new-password/$token$'>
    // link</a>
    // </div>`
}
type ForgotRes = {
    info: string
    error?: string
}

type SetNewPasswordArgs = {
    password: string
    resetPasswordToken: string
}
type SetNewPasswordRes = {
    info: string
    error?: string
}

export const UserAPI = {
    signIn: (args: SignInArgs) => {
        return instance
            .post<MeRes>('/auth/login', {
                email: args.email,
                password: args.password,
                rememberMe: args.rememberMe,
            })
            .then((res) => res.data)
    },
    signUp: (args: SignUpArgs) => {
        return instance
            .post<SignUpRes>('/auth/register', {
                email: args.email,
                password: args.password,
            })
            .then((res) => res)
    },
    signOut: () => {
        return instance.delete('/auth/me').then((res) => res)
    },
    getMe: () => {
        return instance.post<MeRes>('/auth/me').then((res) => res.data)
    },
    forgotPassword: (args: ForgotArgs) => {
        return instance
            .post<ForgotRes>('/auth/forgot', {
                email: args.email,
                from: args.from,
                message: args.message,
            })
            .then((res) => res.data)
    },
    setNewPassword: (args: SetNewPasswordArgs) => {
        return instance
            .post<SetNewPasswordRes>('/auth/set-new-password', {
                password: args.password,
                resetPasswordToken: args.resetPasswordToken,
            })
            .then((res) => res.data)
    },
}
