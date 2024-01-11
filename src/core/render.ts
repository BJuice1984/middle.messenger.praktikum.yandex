import { Login } from '../pages/login/login.ts'
// import * as Pages from '../pages/pages.ts'

// const ROUTES = {
//     login: Pages.LoginPage,
//     register: Pages.RegisterPage,
//     chatty: Pages.ChatPage,
//     profile: Pages.ProfilePage,
//     pageNotFound: Pages.NotFoundPage,
//     serverErrorPage: Pages.ServerErrorPage,
// }

const ROUTES = {
    login: Login,
}

export function render(name: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!

    root.innerHTML = ''

    const Page = ROUTES[name]

    console.log('🚀 ~ render ~ Page:', Page)

    const page = new Page()

    console.log('🚀 ~ render ~ page:', page)

    root.append(page.getContent()!)

    page.dispatchComponentDidMount()
}
