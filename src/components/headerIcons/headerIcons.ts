import Block from '../../core/Block.ts'
import template from './headerIcons.hbs'

export class HeaderIcons extends Block {
    constructor(props) {
        super({
            ...props,
            headerIcons: [
                {
                    src: '/images/start-chat-icon.svg',
                    alt: 'Иконка. Создать чат',
                    onClick: props.onClick,
                },
                {
                    src: '/images/settings-icon.svg',
                    alt: 'Иконка. Настройки',
                    onClick: () => {
                        console.log('Настройки')
                    },
                },
            ],
        })
        console.log('🚀 ~ HeaderIcons ~ constructor ~ props:', props)
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
