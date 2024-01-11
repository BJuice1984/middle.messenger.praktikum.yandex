import { Login } from '../pages/login/login.ts'
import { Register } from '../pages/register/register.ts'

const ROUTES = {
    login: Login,
    register: Register,
}

export function render(name: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!

    root.innerHTML = ''

    const Page = ROUTES[name]

    const page = new Page()

    root.append(page.getContent()!)

    page.dispatchComponentDidMount()
}
