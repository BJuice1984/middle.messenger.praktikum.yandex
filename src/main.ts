import { registerComponent } from './core/registerComponent.ts'
import * as Components from './components/components.ts'
import Block from './core/Block.ts'
import * as Pages from './pages/pages.ts'
import Router from './utils/Router.ts'
import AuthController from './controllers/AuthController.ts'
import { PROFILE, SIGNIN, SIGNUP } from './utils/constants.ts'

export const Routes = {
    Chatty: '/',
    Login: SIGNIN,
    Register: SIGNUP,
    Profile: PROFILE,
    PageNotFound: '/404',
    ServerErrorPage: '/500',
}

Object.entries(Components).forEach(([name, component]) => {
    registerComponent(name, component as typeof Block)
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener('DOMContentLoaded', async () => {
    Router.use(Routes.Chatty, Pages.ChatPage as typeof Block)
        .use(Routes.Login, Pages.LoginPage as typeof Block)
        .use(Routes.Register, Pages.RegisterPage as typeof Block)
        .use(Routes.Profile, Pages.ProfilePage as typeof Block)
        .use(Routes.PageNotFound, Pages.NotFoundPage as typeof Block)
        .use(Routes.ServerErrorPage, Pages.ServerErrorPage as typeof Block)

    try {
        await AuthController.fetchUser()

        Router.start()

        // if (!isProtectedRoute) {
        //     Router.go(Routes.Profile)
        // }
    } catch (e) {
        Router.start()

        // if (isProtectedRoute) {
        // Router.go(Routes.Login)
        // }
    }

    Router.start()
})
