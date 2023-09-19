import Handlebars from 'handlebars'
import * as Components from './components/components.ts'
import * as Pages from './pages/pages.ts'

const pages = {
    'login': [ Pages.LoginPage ],
    'register': [Pages.RegisterPage],
}

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component)
})

function navigate(page: string) {

    const [ source, context ] = pages[page]
    const container = document.getElementById('app')!

    container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('login'))

document.addEventListener('click', e => {

    const page = e.target.getAttribute('page')

    if (page) {
        navigate(page)

        e.preventDefault()
        e.stopImmediatePropagation()
    }
})
