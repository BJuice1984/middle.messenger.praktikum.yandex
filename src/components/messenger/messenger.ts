import Block from '../../core/Block.ts'
import { withStore } from '../../utils/Store.ts'
import template from './messenger.hbs'

// interface ChatListUserProps {
//     title: string
// }

class MessengerBase extends Block {
    constructor(propsFromStore) {
        super({
            selectedChat: propsFromStore.selectedChat,
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}

const withMessenger = withStore(state => {
    const selectedChatId = state.selectedChat

    if (!selectedChatId) {
        return {
            selectedChat: undefined,
        }
    }

    return {
        selectedChat: state.selectedChat,
    }
})

export const Messenger = withMessenger(MessengerBase)
