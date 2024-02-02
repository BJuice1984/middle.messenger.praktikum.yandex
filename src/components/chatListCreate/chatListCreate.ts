import Block from '../../core/Block.ts'
import template from './chatListCreate.hbs'

export class ChatListCreate extends Block {
    constructor(props) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
