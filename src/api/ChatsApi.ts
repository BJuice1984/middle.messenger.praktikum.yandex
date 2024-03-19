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
export interface TokenResponse {
    token: string
}

export interface ChatUser {
    id: number
    first_name: string
    second_name: string
    display_name: string
    login: string
    avatar: string
    role: string
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

    addUsers(data: AddUserToChat): Promise<unknown> {
        return this.http.put('/users', { data })
    }

    getUsers(id: number): Promise<ChatUser[]> {
        return this.http.get(`${id}/users`)
    }

    changeChatAvatar(data: FormData): Promise<User> {
        return this.http.put('/avatar', { data })
    }

    async getToken(id: number): Promise<TokenResponse> {
        const res = await this.http.post(`/token/${id}`)

        return res
    }

    update = undefined
}

export default new ChatsAPI()
