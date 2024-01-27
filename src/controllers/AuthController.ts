import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi.ts'
import store from '../utils/Store.ts'
import router from '../utils/Router.ts'

export class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        console.log('🚀 ~ AuthController ~ signin ~ data:', data)
        console.log('🚀 ~ AuthController ~ fetchUser ~ this.api:', this.api)
        try {
            await this.api.signin(data)

            router.go('/profile')
        } catch (e: any) {
            console.error(e)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)

            await this.fetchUser()

            router.go('/profile')
        } catch (e: any) {
            console.error(e.message)
        }
    }

    async fetchUser() {
        // console.log('🚀 ~ AuthController ~ fetchUser ~ this.api:', this.api)
        const user = await this.api.read()

        store.set('user', user)
    }

    async logout() {
        try {
            await this.api.logout()

            router.go('/')
        } catch (e: any) {
            console.error(e.message)
        }
    }
}

export default new AuthController()
