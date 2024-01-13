import Block from '../../../core/Block.ts'
import template from './input.hbs'

interface InputProps {
    label: string
    name: string
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                blur: event => {
                    console.log(event.target.value)
                },
            },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
