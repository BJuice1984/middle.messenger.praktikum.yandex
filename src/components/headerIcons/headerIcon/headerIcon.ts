import Block from '../../../core/Block.ts'
import template from './headerIcon.hbs'

interface HeaderIconProps {
    src: string
    alt: string
    onClick: () => void
    [key: string]: unknown
}

export class HeaderIcon extends Block<HeaderIconProps> {
    constructor(props: HeaderIconProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        })
        console.log('🚀 ~ HeaderIcon ~ constructor ~ props:', props)
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
