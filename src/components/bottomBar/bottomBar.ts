import Block from '../../core/Block.ts'
import { render } from '../../core/render.ts'
import template from './bottomBar.hbs'

export class BottomBar extends Block {
    constructor() {
        super({
            bottomBarIcons: [
                {
                    src: '/images/bottom-bar-icon_group.svg',
                    alt: 'Иконка. Контакты',
                    onClick: () => {
                        render('profile') //render('contacts')
                    },
                },
                {
                    src: '/images/bottom-bar-icon_chats.svg',
                    alt: 'Иконка. Чаты',
                    onClick: () => {
                        render('chatty')
                    },
                },
                {
                    src: '/images/bottom-bar-icon_more.svg',
                    alt: 'Иконка. Ещё',
                    onClick: () => {
                        render('profile')
                    },
                },
            ],
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
