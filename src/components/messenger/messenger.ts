import Block from '../../core/Block.ts'
import template from './messenger.hbs'

// interface ChatListUserProps {
//     title: string
// }

export class Messenger extends Block {
    constructor() {
        super()
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
