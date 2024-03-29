import Block from '../core/Block.ts'
import isEqual from '../helpers/isEqual.ts'

function render(query: string, block: Block) {
    const root = document.querySelector(query)

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`)
    }

    root.innerHTML = ''

    root.append(block.getContent()!)

    return root
}

class Route {
    private block: Block | null = null

    constructor(
        // eslint-disable-next-line no-unused-vars
        private pathname: string,
        // eslint-disable-next-line no-unused-vars
        private readonly blockClass: typeof Block,
        // eslint-disable-next-line no-unused-vars
        private readonly query: string
    ) {}

    leave() {
        this.block = null
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname)
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass({})

            render(this.query, this.block)
        }
    }
}

class Router {
    private static __instance: Router
    private routes: Route[] = []
    private currentRoute: Route | null = null
    private history = window.history

    // eslint-disable-next-line no-unused-vars
    constructor(private readonly rootQuery: string) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (Router.__instance) {
            return Router.__instance
        }

        this.routes = []

        Router.__instance = this
    }

    public use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, this.rootQuery)

        this.routes.push(route)

        return this
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window

            this._onRoute(target.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname)

        if (!route) {
            return
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave()
        }

        this.currentRoute = route

        route.render()
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname)

        this._onRoute(pathname)
    }

    public back() {
        this.history.back()
    }

    public forward() {
        this.history.forward()
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }
}

export default new Router('#app')
