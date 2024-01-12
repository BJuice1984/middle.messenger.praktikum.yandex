import { render } from './core/render.ts'
import { registerComponent } from './core/registerComponent.ts'
import * as Components from './components/components.ts'

Object.entries(Components).forEach(([name, component]) => {
    registerComponent(name, component)
})

document.addEventListener('DOMContentLoaded', () => render('login'))

// import Handlebars from 'handlebars'
// import * as Components from './components/components.ts'
// import * as Pages from './pages/pages.ts'

// const pages = {
//     login: [Pages.LoginPage, { test: '12345' }],
//     register: [Pages.RegisterPage],
//     chatty: [Pages.ChatPage],
//     profile: [Pages.ProfilePage],
//     pageNotFound: [Pages.NotFoundPage],
//     serverErrorPage: [Pages.ServerErrorPage],
// }

// Object.entries(Components).forEach(([name, component]) => {
//     Handlebars.registerPartial(name, component)
// })

// function navigate(page: string) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //@ts-ignore
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const [source, context] = pages[page]
//     const container = document.getElementById('app')!

//     container.innerHTML = Handlebars.compile(source)(context)
// }

// document.addEventListener('DOMContentLoaded', () => navigate('login'))

// //повесить слушатель на кнопку
// document.addEventListener('click', e => {
//     if (!e.target) return

//     const el = e.target as HTMLButtonElement
//     const page = el.getAttribute('page') as string

//     if (page.length > 0) {
//         navigate(page)

//         e.preventDefault()
//         e.stopImmediatePropagation()
//     }
// })
