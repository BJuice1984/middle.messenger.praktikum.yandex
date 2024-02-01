import MessagesController from '../../controllers/MessagesController.ts'
import Block from '../../core/Block.ts'
import { withStore } from '../../utils/Store.ts'
import { emptyValidationMessage } from '../../utils/constants.ts'
import { emptyValidator } from '../../utils/validators.ts'
import template from './messenger.hbs'

// interface ChatListUserProps {
//     title: string
// }

class MessengerBase extends Block {
    constructor(propsFromStore) {
        super({
            selectedChat: propsFromStore.selectedChat,
            messages: propsFromStore.messages,
            currentUser_id: propsFromStore.currentUser_id,
            inputs: [
                {
                    label: 'type something...',
                    name: 'message',
                    validate: emptyValidator,
                    validateMessage: emptyValidationMessage,
                },
            ],
            buttons: [
                {
                    label: 'send',
                    classType: 'primary',
                    type: 'submit',
                    handleSubmitClick: value => {
                        void MessagesController.sendMessage(
                            propsFromStore.selectedChat,
                            value.message
                        )
                    },
                },
            ],
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
            messages: [],
            currentUser_id: state.user?.id,
        }
    }

    return {
        selectedChat: state.selectedChat,
        messages: ((state.messages || {})[selectedChatId] || []).map(message => ({
            ...message,
            isMine: message.user_id === state.user.id,
        })),
        currentUser_id: state.user.id,
    }
})

export const Messenger = withMessenger(MessengerBase)
