import Block from '../../core/Block.ts'
import template from './headerIcons.hbs'

export class HeaderIcons extends Block {
    constructor() {
        super({
            headerIcons: [
                {
                    src: '/images/start-chat-icon.svg',
                    alt: 'Иконка. Создать чат',
                    onClick: () => {
                        console.log('Создать чат')
                    },
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
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
