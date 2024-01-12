import Block from '../../core/Block.ts'
import { render } from '../../core/render.ts'
import template from './login.hbs'

export class LoginPage extends Block {
    constructor() {
        super({
            inputs: [
                {
                    label: 'Login (Required)',
                    name: 'login',
                    ref: 'login',
                },
                {
                    label: 'Password (Required)',
                    name: 'password',
                    ref: 'password',
                },
            ],
            buttons: [
                {
                    label: 'Sign in',
                    classType: 'primary',
                    onClick: event => {
                        event.preventDefault()
                        const login = this.refs.login.value()
                        const password = this.refs.password.value()

                        console.log(this.refs.login)
                        // render('chatty')
                    },
                },
                {
                    label: 'Sign up',
                    classType: 'secondary',
                    onClick: () => {
                        render('register')
                    },
                },
                {
                    label: '404',
                    classType: 'secondary',
                    onClick: () => {
                        render('pageNotFound')
                    },
                },
                {
                    label: '500',
                    classType: 'secondary',
                    onClick: () => {
                        render('serverErrorPage')
                    },
                },
            ],
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
