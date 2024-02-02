import { Indexed, set } from '../helpers/helpers.ts'
import EventBus from '../core/EventBus.ts'
import Block from '../core/Block.ts'
import { Message } from '../controllers/MessagesController.ts'

// eslint-disable-next-line no-shadow
export enum StoreEvents {
    // eslint-disable-next-line no-unused-vars
    Updated = 'updated',
}

export interface AppState {
    selectedChat?: number
    messages?: Message[]
    user?: {
        first_name: string
        second_name: string
        email: string
        login: string
        phone: string
        id: number
    }
    chats?: {
        [key: string]: unknown
    }[]
}

export interface ComponentProps {
    selectedChat?: number
    messages?: Message[]
    user?: {
        first_name?: string
        second_name?: string
        email?: string
        login?: string
        phone?: string
    }
    chats?: {
        [key: string]: unknown
    }[]
}

export class Store extends EventBus {
    private state: Indexed<unknown> = {}

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data)

        this.emit(StoreEvents.Updated, this.getState())
    }

    public getState() {
        return this.state
    }
}

const store = new Store()
window.store = store

// eslint-disable-next-line no-unused-vars
export function withStore(mapStateToProps: (state: AppState) => ComponentProps) {
    return function wrap(Component: typeof Block) {
        let previousState: ComponentProps

        return class WithStore extends Component {
            constructor(props: ComponentProps) {
                previousState = mapStateToProps(store.getState())

                super({ ...props, ...previousState })

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState())

                    previousState = stateProps

                    this.setProps({ ...stateProps })
                })
            }
        }
    }
}

export default store
