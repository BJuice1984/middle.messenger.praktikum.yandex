import API, { ChatInfo, ChatsAPI, CreateChatData, TokenResponse } from '../api/ChatsApi.ts'
import store from '../utils/Store.ts'
import MessagesController from './MessagesController.ts'

class ChatsController {
    private readonly api: ChatsAPI

    constructor() {
        this.api = API
    }

    async create(title: CreateChatData): Promise<void> {
        try {
            await this.api.create(title)
        } catch (e: unknown) {
            console.error('Ошибка при создании чата:', e)
        }

        void this.fetchChats()
    }

    async fetchChats(): Promise<void> {
        let chats: ChatInfo[] = []

        try {
            chats = await this.api.read()
        } catch (e: unknown) {
            console.error('Ошибка при получении списка чатов:', e)
        }

        for (const chat of chats) {
            try {
                const res: TokenResponse = await this.getToken(chat.id)

                const token: string = res.token

                await MessagesController.connect(chat.id, token)
            } catch (e: unknown) {
                console.error(`Ошибка при обработке чата с ID ${chat.id}:`, e)
            }
        }

        store.set('chats', chats)
    }

    async addUsersToChat(users: number[], chatId: number) {
        try {
            await this.api.addUsers({ users, chatId })
            void this.fetchChats()
        } catch (e: unknown) {
            console.error('Ошибка при добавлении пользователей в чат:', e)
        }
    }

    async delete(id: number) {
        try {
            await this.api.delete({ chatId: id })

            void this.fetchChats()
        } catch (e: unknown) {
            console.error('Ошибка при удалении чата:', e)
        }
    }

    getToken(id: number) {
        return this.api.getToken(id)
    }

    selectChat(id: number) {
        store.set('selectedChat', id)
    }
}

export default new ChatsController()
