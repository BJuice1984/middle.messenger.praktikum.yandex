import { ChatInfo } from '../../api/ChatsApi.ts'
import Block from '../../core/Block.ts'
import { withStore } from '../../utils/Store.ts'
import template from './chat.hbs'

interface ChatPageProps {
    stories: {
        owner: string
        extraClass?: string
        src: string
        alt: string
    }[]
    chats?: ChatInfo[]
}

class ChatPageBase extends Block {
    constructor(propsFromStore: ChatPageProps) {
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
            chats: propsFromStore.chats,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}

const withChats = withStore(state => ({ chats: state.chats }))

export const ChatPage = withChats(ChatPageBase as typeof Block)
