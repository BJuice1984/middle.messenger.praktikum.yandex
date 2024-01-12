import Block from '../../core/Block.ts'
import template from './bottomBar.hbs'

interface BottomBarProps {
    label: string
    name: string
    data: string
}

export class BottomBar extends Block {
    constructor(props: BottomBarProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
