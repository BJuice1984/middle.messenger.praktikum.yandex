import Handlebars from 'handlebars'
import * as Components from './components/components.ts'
import * as Pages from './pages/pages.ts'

const pages = {
    'login': [Pages.LoginPage, {test: '123'}],
    'register': [Pages.RegisterPage],
    'chatty': [Pages.ChatPage],
}

Object.entries(Components).forEach(([ name, component ]) => {
    // console.log('component', component)
    // console.log('name', name)
    // console.log('component', component)
    Handlebars.registerPartial(name, component)
})

function navigate(page: string) {
    const [ source, context ] = pages[page]

    // console.log('source', source)
    // console.log('context', typeof context)
    // console.log('pages', pages[page])
    const container = document.getElementById('app')!

    container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('login'))

document.addEventListener('click', e => {
    if (!e.target) return

    const el = e.target as HTMLButtonElement
    const page = el.getAttribute('page') as string

    if (page.length > 0) {
        navigate(page)

        e.preventDefault()
        e.stopImmediatePropagation()
    }
})
