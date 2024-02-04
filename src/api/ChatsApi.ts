import BaseAPI from './BaseApi.ts'
import { User } from './AuthApi.ts'

export interface CreateChatData {
    title: string
    [key: string]: unknown
}

export interface DeleteChatData {
    chatId: number
    [key: string]: unknown
}

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

interface AddUserToChat {
    users: number[]
    chatId: number
    [key: string]: unknown
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats')
    }

    create(data: CreateChatData) {
        return this.http.post('/', { data })
    }

    delete(data: DeleteChatData): Promise<unknown> {
        return this.http.delete('/', { data })
    }

    read(): Promise<ChatInfo[]> {
        return this.http.get('/')
    }

    // getUsers(id: number): Promise<Array<User & { role: string }>> {
    //     return this.http.get(`/${id}/users`)
    // }

    addUsers(data: AddUserToChat): Promise<unknown> {
        return this.http.put('/users', { data })
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post(`/token/${id}`)

        return response.token
    }

    // async getToken(id: number): Promise<string> {
    //     const response = await this.http.post<{ token: string }>(`/token/${id}`)

    //     return response.token
    // }

    update = undefined
}

export default new ChatsAPI()
