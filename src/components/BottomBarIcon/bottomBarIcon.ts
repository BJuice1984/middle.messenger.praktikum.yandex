import Block from '../../core/Block.ts'
import template from './bottomBarIcon.hbs'

interface BottomBarIconProps {
    src: string
    alt: string
    onClick: () => void
}

export class BottomBarIcon extends Block {
    constructor(props: BottomBarIconProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
