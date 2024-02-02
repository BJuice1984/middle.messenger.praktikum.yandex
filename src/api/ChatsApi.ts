import BaseAPI from './BaseApi.ts'
import { User } from './AuthApi.ts'

export interface ChatInfo {
    avatar?: string
    created_by: number
    id: number
    title: string
    unread_count: number
    last_message: LastMessage
}

interface LastMessage {
    content: string
    id: number
    time: string
    user: User
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats')
    }

    create(title: string) {
        return this.http.post('/', { title })
    }

    delete(id: number): Promise<unknown> {
        return this.http.delete('/', { chatId: id })
    }

    read(): Promise<ChatInfo[]> {
        return this.http.get('/')
    }

    getUsers(id: number): Promise<Array<User & { role: string }>> {
        return this.http.get(`/${id}/users`)
    }

    addUsers(id: number, users: number[]): Promise<unknown> {
        return this.http.put('/users', { users, chatId: id })
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`)

        return response.token
    }

    update = undefined
}

export default new ChatsAPI()
