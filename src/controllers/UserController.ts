import API, { SearchUserData, UsersAPI } from '../api/UserApi.ts'
// import store from '../utils/Store.ts'
// import MessagesController from './MessagesController.ts'

class UserController {
    private readonly api: UsersAPI

    constructor() {
        this.api = API
    }

    async searchUserByLogin(login: SearchUserData) {
        const users = []
        const user = await this.api.searchUsers(login)

        users.push(user[0].id)

        return users
    }
}

export default new UserController()
