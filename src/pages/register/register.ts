import Block from '../../core/Block.ts'
import template from './register.hbs'

export class RegisterPage extends Block {
    constructor() {
        super()
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
