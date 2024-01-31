import ChatsController from '../../controllers/ChatsController.ts'
import Block from '../../core/Block.ts'
import template from './chatListUser.hbs'

interface ChatListUserProps {
    title: string
}

export class User extends Block {
    constructor(props: ChatListUserProps) {
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
