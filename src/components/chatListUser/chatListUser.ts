import Block from '../../core/Block.ts'
import template from './chatListUser.hbs'

interface ChatListUserProps {
    name: string
}

export class User extends Block {
    constructor(props: ChatListUserProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
