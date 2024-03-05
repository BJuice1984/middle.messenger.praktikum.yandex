import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi.ts'
import store from '../utils/Store.ts'
import Router from '../utils/Router.ts'
import { PROFILE, SIGNIN } from '../utils/constants.ts'

class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data)
            await this.fetchUser()

            Router.go('/')
        } catch (e: unknown) {
            console.error('Ошибка при входе в систему:', e)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)

            await this.fetchUser()

            Router.go(PROFILE)
        } catch (e: unknown) {
            console.error('Ошибка при регистрации:', e)
        }
    }

    async fetchUser() {
        let user = {}

        try {
            user = await this.api.read()
        } catch (e: unknown) {
            console.error('Ошибка при получении информации о пользователе:', e)
        }

        store.set('user', user)
    }

    async logout() {
        try {
            await this.api.logout()

            Router.go(SIGNIN)
        } catch (e: unknown) {
            console.error('Ошибка при выходе из системы:', e)
        }
    }
}

export default new AuthController()
