import Block from '../../core/Block.ts'
import template from './message.hbs'

export class Message extends Block {
    constructor(props) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
