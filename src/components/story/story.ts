import Block from '../../core/Block.ts'
import template from './story.hbs'

interface StoryProps {
    label: string
    name: string
    data: string
}

export class Story extends Block {
    constructor(props: StoryProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
