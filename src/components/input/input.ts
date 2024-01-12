import Block from '../../core/Block.ts'
import template from './input.hbs'

interface InputProps {
    label: string
    name: string
    ref: string
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
        })
    }

    public value() {
        // if (!this.validate()) {
        //     return false
        // }
        return this.refs
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
