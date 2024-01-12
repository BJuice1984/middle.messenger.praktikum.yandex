import Block from '../../core/Block.ts'
import template from './profile.hbs'

export class ProfilePage extends Block {
    constructor() {
        super()
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
