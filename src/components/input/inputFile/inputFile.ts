import Block from '../../../core/Block.ts'
import template from './inputFile.hbs'

interface InputFileProps {
    name: string
    type: string
    extraClass: string
    [key: string]: unknown
}

export class InputFile extends Block<InputFileProps> {
    constructor(props: InputFileProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
