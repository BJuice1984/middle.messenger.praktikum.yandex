import API, { ChangeUserData, SearchUserData, UsersAPI } from '../api/UserApi.ts'

class UserController {
    private readonly api: UsersAPI

    constructor() {
        this.api = API
    }

    async searchUserByLogin(login: SearchUserData) {
        const users = []

        try {
            const user = await this.api.searchUsers(login)

            users.push(user[0].id)

            return users
        } catch (e: unknown) {
            console.error('Ошибка при поиске пользователя:', e)
        }
    }

    async changeUserInfo(userData: ChangeUserData) {
        try {
            await this.api.changeUser(userData)
        } catch (e: unknown) {
            console.error('Ошибка при изменении информации о пользователе:', e)
        }
    }

    async changeUserAvatar(userData: FormData) {
        try {
            await this.api.changeAvatar(userData)
        } catch (e: unknown) {
            console.error('Ошибка при изменении аватара пользователя:', e)
        }
    }
}

export default new UserController()
