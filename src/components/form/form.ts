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
        console.log('🚀 ~ Form ~ constructor ~ props:', props)
        super({
            ...props,
            events: {
                submit: e => {
                    e.preventDefault()

                    console.log('🚀 ~ Form ~ constructor ~ e.target:', e.target)
                },
            },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
