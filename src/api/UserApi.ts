import { User } from './AuthApi.ts'
import BaseAPI from './BaseApi.ts'

export interface SearchUserData {
    login: string
    [key: string]: unknown
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    searchUsers(data: SearchUserData): Promise<User[]> {
        return this.http.post('/search', { data })
    }

    read = undefined
    update = undefined
    create = undefined
    delete = undefined
    request = undefined
}

export default new UsersAPI()
