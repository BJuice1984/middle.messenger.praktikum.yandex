import Block from '../../core/Block.ts'
import store, { withStore } from '../../utils/Store.ts'
import template from './chat.hbs'

class ChatPageBase extends Block {
    constructor() {
        super({
            stories: [
                {
                    owner: 'You story',
                    extraClass: 'chat-story__container_type_add-story',
                    src: '/images/add-story-icon.svg',
                    alt: 'Иконка. Создать историю',
                },
                {
                    owner: 'Midala Huininja',
                    src: '/images/ava-1.jpg',
                    alt: 'Иконка. Аватар пользователя',
                },
                {
                    owner: 'Athalia Putri',
                    src: '/images/ava-2.jpg',
                    alt: 'Иконка. Аватар пользователя',
                },
                {
                    owner: 'Erlan Sadewa',
                    src: '/images/ava-3.jpg',
                    alt: 'Иконка. Аватар пользователя',
                },
            ],
            chats: [],
        })
    }

    render() {
        const propsToRender = { ...this.props }
        console.log('🚀 ~ ChatPageBase ~ render ~ this.props:', this.props)

        const { chats, messages } = store.getState()

        if (chats) {
            console.log('🚀 ~ ChatPageBase ~ render ~ chats:', chats)
            console.log('🚀 ~ ChatPageBase ~ render ~ propsToRender:', propsToRender)
        }
        if (messages) {
            console.log('🚀 ~ ChatPageBase ~ render ~ messages:', messages)
        }
        return this.compile(template, propsToRender)
    }

    // render() {
    //     return this.compile(template, this.props as Record<string, unknown>)
    // }
}

const withChats = withStore(state => ({ chats: state.chats }))

export const ChatPage = withChats(ChatPageBase as typeof Block)
