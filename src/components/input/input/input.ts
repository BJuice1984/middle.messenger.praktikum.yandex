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
        })
        // console.log(this.element)
    }

    public value() {
        // if (!this.validate()) {
        //     return false
        // }
        console.log(this.element)
        // return this.element?.value
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
