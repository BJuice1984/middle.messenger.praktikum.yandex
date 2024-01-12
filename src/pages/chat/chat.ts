import Block from '../../core/Block.ts'
import template from './chat.hbs'

export class ChatPage extends Block {
    constructor() {
        super()
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
