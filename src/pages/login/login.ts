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
                    onFocusout: (e: { target: { value: string } }) => console.log(e.target.value),
                },
                {
                    label: 'Password (Required)',
                    name: 'password',
                    onFocusout: (e: { target: { value: string } }) => console.log(e.target.value),
                },
            ],
            buttons: [
                {
                    label: 'Sign in',
                    classType: 'primary',
                    onClick: () => {
                        render('chatty')
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
