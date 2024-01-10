import EventBus from './EventBus.ts'
import { nanoid } from 'nanoid'

interface Props {
    events?: Record<string, () => void>
}

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    public id = nanoid(6)
    protected props: unknown
    // eslint-disable-next-line no-use-before-define
    protected refs: Record<string, Block> = {}
    // eslint-disable-next-line no-use-before-define
    public children: Record<string, Block>
    private eventBus: () => EventBus
    private _element: HTMLElement | null = null
    // private _meta: { props: Props }

    constructor(propsWithChildren: unknown = {}) {
        const eventBus = new EventBus()

        const { props, children } = this._getChildrenAndProps(propsWithChildren)

        // this._meta = {
        //     props,
        // }

        this.children = children
        this.props = this._makePropsProxy(props)

        this.eventBus = () => eventBus

        this._registerEvents(eventBus)

        eventBus.emit(Block.EVENTS.INIT)
    }

    private _getChildrenAndProps(childrenAndProps: unknown) {
        const props: Record<string, unknown> = {}
        const children: Record<string, Block> = {}

        // Проверка, что childrenAndProps - это объект с строковыми ключами
        if (typeof childrenAndProps === 'object' && childrenAndProps !== null) {
            Object.entries(childrenAndProps).forEach(([key, value]) => {
                if (value instanceof Block) {
                    children[key] = value
                } else {
                    props[key] = value
                }
            })
        } else {
            // Обработка случая, когда childrenAndProps не является объектом
            console.error('Invalid childrenAndProps:', childrenAndProps)
        }

        return { props, children }
    }

    _addEvents() {
        const { events = {} } = this.props as Props

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName])
        })
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private _init() {
        this.init()

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    protected init() {}

    _componentDidMount() {
        this.componentDidMount()
    }

    componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount())
    }

    private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        }
    }

    protected componentDidUpdate(oldProps: unknown, newProps: unknown) {
        return true
    }

    setProps = (nextProps: unknown) => {
        if (nextProps === undefined || nextProps === null) {
            return
        }

        // this.props = { ...this.props, ...(nextProps as object) }
        Object.assign(this.props, nextProps)
    }

    get element() {
        return this._element
    }

    private _render() {
        const fragment = this.render()

        const newElement = fragment.firstElementChild as HTMLElement

        if (this._element) {
            this._element.replaceWith(newElement)
        }

        this._element = newElement

        this._addEvents()
    }

    protected compile(
        template: (context: Record<string, unknown>) => string,
        context: Record<string, unknown>
    ) {
        const contextAndStubs: Record<string, unknown> = { ...context, __refs: this.refs }

        const html = template(contextAndStubs)

        const temp = document.createElement('template')

        temp.innerHTML = html

        contextAndStubs.__children?.forEach(
            ({ embed }: { embed: (content: DocumentFragment) => void }) => {
                embed(temp.content)
            }
        )

        return temp.content
    }
    protected render(): DocumentFragment {
        return new DocumentFragment()
    }

    getContent() {
        return this.element
    }

    _makePropsProxy(props: Record<string | symbol, unknown>) {
        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop]

                return typeof value === 'function' ? (value as Function).bind(target) : value
            },
            set: (target, prop, value) => {
                const oldTarget = { ...target }

                target[prop] = value
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)

                return true
            },
            deleteProperty: () => {
                throw new Error('Нет доступа')
            },
        })
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName)
    }

    show() {
        this.getContent()!.style.display = 'block'
    }

    hide() {
        this.getContent()!.style.display = 'none'
    }
}

export default Block
