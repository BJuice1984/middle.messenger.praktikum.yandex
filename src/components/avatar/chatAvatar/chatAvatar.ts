import Block from '../../../core/Block.ts'
import template from './chatAvatar.hbs'

interface UserAvatarProps {
    onClick?: () => void
    avatar: string
    [key: string]: unknown
}

export class ChatAvatar extends Block<UserAvatarProps> {
    constructor(props: UserAvatarProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
