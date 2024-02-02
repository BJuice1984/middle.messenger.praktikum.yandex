import { ChatInfo } from '../../api/ChatsApi.ts'
import ChatsController from '../../controllers/ChatsController.ts'
import Block from '../../core/Block.ts'
import template from './chatListUser.hbs'

export class User extends Block {
    constructor(props: ChatInfo) {
        super({
            ...props,
            events: {
                click: () => ChatsController.selectChat(props.id),
            },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
