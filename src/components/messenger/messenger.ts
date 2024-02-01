import MessagesController from '../../controllers/MessagesController.ts'
import Block from '../../core/Block.ts'
import { Button, Input } from '../../pages/profile/profile.ts'
import { withStore } from '../../utils/Store.ts'
import { emptyValidationMessage } from '../../utils/constants.ts'
import { emptyValidator } from '../../utils/validators.ts'
import template from './messenger.hbs'

interface MessengerProps {
    inputs: Input[]
    buttons: Button[]
    [key: string]: unknown
}

class MessengerBase extends Block {
    constructor(propsFromStore: MessengerProps) {
        super({
            selectedChat: propsFromStore.selectedChat,
            messages: propsFromStore.messages,
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
                    handleSubmitClick: (value: { message: string }) => {
                        void MessagesController.sendMessage(
                            propsFromStore.selectedChat as number,
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

    if (selectedChatId == null) {
        return {
            selectedChat: undefined,
            messages: [],
        }
    }

    return {
        selectedChat: state.selectedChat,
        messages: ((state.messages || {})[selectedChatId] || []).map(message => ({
            ...message,
            isMine: message.user_id === state.user.id,
        })),
    }
})

export const Messenger = withMessenger(MessengerBase as typeof Block)
