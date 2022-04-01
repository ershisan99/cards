import { instance } from './instance'

type LoginArgs = {
    email: string
    password: string
    rememberMe: boolean
}
type MeRes = {
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

type RegisterArgs = {
    email: string
    password: string
}
type RegisterRes = {
    addedUser: any
    error?: string
}

type ForgotArgs = {
    email: string // кому восстанавливать пароль
    from: string // от кого придёт письмо
    message: string // письмо, вместо $token$ бэк вставит токен. Пример:
    //`<div style="background-color: lime; padding: 15px">
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
    login: (args: LoginArgs) => {
        return instance
            .post<MeRes>('/auth/login', {
                email: args.email,
                password: args.password,
                rememberMe: args.rememberMe,
            })
            .then((res) => res.data)
    },
    register: (args: RegisterArgs) => {
        return instance
            .post<RegisterRes>('/auth/register', {
                email: args.email,
                password: args.password,
            })
            .then((res) => res.data)
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
