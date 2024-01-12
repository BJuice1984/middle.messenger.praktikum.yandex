import Block from '../../core/Block.ts'
import template from './chatListUser.hbs'

interface ChatListUserProps {
    label: string
    name: string
    data: string
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
