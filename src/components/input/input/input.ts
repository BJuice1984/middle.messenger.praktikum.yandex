import Block from '../../../core/Block.ts'
import template from './input.hbs'

interface InputProps {
    onBlur: () => void
    label: string
    name: string
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur,
            },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
