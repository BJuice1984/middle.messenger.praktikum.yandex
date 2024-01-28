import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi.ts'
import store from '../utils/Store.ts'
import router from '../utils/Router.ts'

export class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data)

            router.go('/profile')
        } catch (e: unknown) {
            console.error((e as Error).message)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)

            await this.fetchUser()

            router.go('/profile')
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

            router.go('/')
        } catch (e: unknown) {
            console.error((e as Error).message)
        }
    }
}

export default new AuthController()
