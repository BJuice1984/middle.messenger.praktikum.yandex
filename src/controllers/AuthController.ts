import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi.ts'
import store from '../utils/Store.ts'
import Router from '../utils/Router.ts'

export class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data)
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)
        } catch (e: unknown) {
            console.error(e)
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
            console.error(e)
        }
    }
}

export default new AuthController()
