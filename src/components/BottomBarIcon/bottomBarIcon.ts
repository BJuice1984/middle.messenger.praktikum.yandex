import Block from '../../core/Block.ts'
import template from './bottomBarIcon.hbs'

interface BottomBarIconProps {
    label: string
    name: string
    data: string
}

export class BottomBarIcon extends Block {
    constructor(props: BottomBarIconProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
