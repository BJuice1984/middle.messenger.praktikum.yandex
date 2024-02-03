import API, { SearchUserData, UsersAPI } from '../api/UserApi.ts'
// import store from '../utils/Store.ts'
// import MessagesController from './MessagesController.ts'

class UserController {
    private readonly api: UsersAPI

    constructor() {
        this.api = API
    }

    async searchUserByLogin(login: SearchUserData) {
        const user = await this.api.searchUsers(login)
        console.log('🚀 ~ UserController ~ searchUserByLogin ~ user:', user)
    }

    // async create(title: CreateChatData) {
    //     await this.api.create(title)

    //     void this.fetchChats()
    // }

    // async fetchChats() {
    //     const chats = await this.api.read()

    //     chats.map(async chat => {
    //         const token = await this.getToken(chat.id)

    //         await MessagesController.connect(chat.id, token)
    //     })

    //     store.set('chats', chats)
    // }

    // addUserToChat(id: number, userId: number) {
    //     this.api.addUsers(id, [userId])
    // }

    // addUserToChat(id: number, userId: number) {
    //     this.api.addUsers(id, [userId])
    // }

    // async delete(id: number) {
    //     await this.api.delete({ chatId: id })

    //     void this.fetchChats()
    // }

    // getToken(id: number) {
    //     return this.api.getToken(id)
    // }

    // selectChat(id: number) {
    //     store.set('selectedChat', id)
    // }
}

export default new UserController()
