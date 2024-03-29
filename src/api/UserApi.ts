import { User } from './AuthApi.ts'
import BaseAPI from './BaseApi.ts'

export interface SearchUserData {
    login: string
    [key: string]: unknown
}

export interface ChangeUserData {
    id: number
    login: string
    first_name: string
    second_name: string
    email: string
    phone: string
    display_name: string
    avatar: string
    [key: string]: unknown
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    searchUsers(data: SearchUserData): Promise<User[]> {
        return this.http.post('/search', { data })
    }

    changeUser(data: ChangeUserData): Promise<User> {
        return this.http.put('/profile', { data })
    }

    changeAvatar(data: FormData): Promise<User> {
        return this.http.put('/profile/avatar', { data })
    }

    read = undefined
    update = undefined
    create = undefined
    delete = undefined
    request = undefined
}

export default new UsersAPI()
