import API, { ChatsAPI, CreateChatData } from '../api/ChatsApi.ts'
import store from '../utils/Store.ts'
import MessagesController from './MessagesController.ts'

class ChatsController {
    private readonly api: ChatsAPI

    constructor() {
        this.api = API
    }

    async create(title: CreateChatData) {
        await this.api.create(title)
        void this.fetchChats()
    }

    async fetchChats() {
        const chats = await this.api.read()

        chats.map(async chat => {
            const token = await this.getToken(chat.id)

            await MessagesController.connect(chat.id, token)
        })

        store.set('chats', chats)
    }

    async addUsersToChat(users: number[], chatId: number) {
        await this.api.addUsers({ users, chatId })
        void this.fetchChats()
    }

    async delete(id: number) {
        await this.api.delete({ chatId: id })

        void this.fetchChats()
    }

    getToken(id: number) {
        return this.api.getToken(id)
    }

    selectChat(id: number) {
        store.set('selectedChat', id)
    }
}

export default new ChatsController()
