import Block from '../../core/Block.ts'
import template from './input.hbs'

interface InputProps {
    label: string
    name: string
    data: string
    // type: 'password' | 'text'
    // placeholder: string
    // onFocusout?: () => void
    // events: {
    //     focusout: () => void
    // }
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            // events: {
            //     focusout: props.onFocusout,
            // },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
