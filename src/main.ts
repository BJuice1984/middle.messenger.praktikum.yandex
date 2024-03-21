import { registerComponent } from './core/registerComponent.ts'
import * as Components from './components/components.ts'
import Block from './core/Block.ts'
import * as Pages from './pages/pages.ts'
import Router from './utils/Router.ts'
import AuthController from './controllers/AuthController.ts'
import { MESSENGER, PROFILE, SIGNIN, SIGNUP } from './utils/constants.ts'
import ChatsController from './controllers/ChatsController.ts'

export const Routes = {
    Chatty: MESSENGER,
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

    Router.start()

    let isProtectedRoute = true

    switch (document.location.pathname) {
        case Routes.Login:
        case Routes.Register:
            isProtectedRoute = false

            break
    }

    try {
        await AuthController.fetchUser()
        await ChatsController.fetchChats()
        // Router.go(Routes.Profile)
    } catch (e) {
        console.error(e)
        console.log('🚀 ~ document.addEventListener ~ error:')

        if (!isProtectedRoute) {
            Router.go(Routes.Login)
        }
    }
})
