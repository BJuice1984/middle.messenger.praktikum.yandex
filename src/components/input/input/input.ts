import Block from '../../../core/Block.ts'
import template from './input.hbs'

interface InputProps {
    onFocusout: () => void
    label: string
    name: string
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                focusout: props.onFocusout,
            },
        })
        console.log('🚀 ~ Input ~ constructor ~ props:', props)
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
