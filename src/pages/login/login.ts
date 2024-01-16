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
                    validate: (value: string) => !(value.length < 3 && value.length !== 0),
                    validateMessage: 'не менее 3-х символов',
                },
                {
                    label: 'Password (Required)',
                    name: 'password',
                    validate: (value: string) => !(value.length < 6 && value.length !== 0),
                    validateMessage: 'не менее 6-ти символов',
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
