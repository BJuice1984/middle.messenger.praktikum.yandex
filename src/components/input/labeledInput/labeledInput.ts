import Block from '../../../core/Block.ts'
import template from './labeledInput.hbs'

interface LabeledInputProps {
    label: string
    name: string
}

export class LabeledInput extends Block {
    constructor(props: LabeledInputProps) {
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
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
