import * as Pages from './pages/pages.ts'

const ROUTES = {
    login: Pages.LoginPage,
    register: Pages.RegisterPage,
    chatty: Pages.ChatPage,
    profile: Pages.ProfilePage,
    pageNotFound: Pages.NotFoundPage,
    serverErrorPage: Pages.ServerErrorPage,
}

export function render(name: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!

    root.innerHTML = ''

    const Page = ROUTES[name]

    const page = new Page()

    root.append(page.getContent()!)

    page.dispatchComponentDidMount()
}
