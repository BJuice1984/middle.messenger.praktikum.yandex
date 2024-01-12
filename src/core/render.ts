// import {
//     ChatPage,
//     LoginPage,
//     NotFoundPage,
//     ProfilePage,
//     RegisterPage,
//     ServerErrorPage
// } from '../pages/pages.ts'
import * as Pages from '../pages/pages.ts'

const ROUTES = {
    login: Pages.LoginPage,
    register: Pages.RegisterPage,
    profile: Pages.ProfilePage,
    chatty: Pages.ChatPage,
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