import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi.ts'
import store from '../utils/Store.ts'
import Router from '../utils/Router.ts'
import { PROFILE } from '../utils/constants.ts'

export class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data)

            Router.go('/')
        } catch (e: unknown) {
            console.error((e as Error).message)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)

            await this.fetchUser()

            Router.go(PROFILE)
        } catch (e: unknown) {
            console.error((e as Error).message)
        }
    }

    async fetchUser() {
        const user = await this.api.read()

        store.set('user', user)
    }

    async logout() {
        try {
            await this.api.logout()

            Router.go('/')
        } catch (e: unknown) {
            console.error((e as Error).message)
        }
    }
}

export default new AuthController()
