import Block from '../../core/Block.ts'
import template from './form.hbs'

interface FormProps {
    inputs: {
        label: string
        name: string
    }[]
    buttons: {
        label: string
        classType: string
        onClick: () => void
    }[]
}

export class Form extends Block {
    constructor(props: FormProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
