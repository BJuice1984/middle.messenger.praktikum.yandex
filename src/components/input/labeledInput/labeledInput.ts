import Block from '../../../core/Block.ts'
import template from './labeledInput.hbs'

interface LabeledInputProps {
    label: string
    name: string
    // eslint-disable-next-line no-unused-vars
    validate: (value: string) => boolean
}

export class LabeledInput extends Block {
    constructor(props: LabeledInputProps) {
        super({
            ...props,
            onBlur: (e: { target: { value: string } }) =>
                this.refs.error.setProps({ isShown: !props.validate(e.target.value) }),
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
