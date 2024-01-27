// import { render } from './core/render.ts'
import { registerComponent } from './core/registerComponent.ts'
import * as Components from './components/components.ts'
import Block from './core/Block.ts'
import * as Pages from './pages/pages.ts'
import Router from './utils/Router.ts'

// const ROUTES = {
//     login: Pages.LoginPage,
//     register: Pages.RegisterPage,
//     profile: Pages.ProfilePage,
//     chatty: Pages.ChatPage,
//     pageNotFound: Pages.NotFoundPage,
//     serverErrorPage: Pages.ServerErrorPage,
// }

export const Routes = {
    Chatty: '/',
    Login: '/login',
    Register: '/register',
    Profile: '/profile',
    PageNotFound: '/404',
    ServerErrorPage: '/500',
}

Object.entries(Components).forEach(([name, component]) => {
    registerComponent(name, component as typeof Block)
})

document.addEventListener('DOMContentLoaded', () => {
    Router.use(Routes.Chatty, Pages.ChatPage)
        .use(Routes.Login, Pages.LoginPage)
        .use(Routes.Register, Pages.RegisterPage)
        .use(Routes.Profile, Pages.ProfilePage)
        .use(Routes.PageNotFound, Pages.NotFoundPage)
        .use(Routes.ServerErrorPage, Pages.ServerErrorPage)

    Router.start()
})

// document.addEventListener('DOMContentLoaded', () => render('login'))
