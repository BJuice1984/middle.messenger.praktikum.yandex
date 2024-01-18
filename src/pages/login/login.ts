import Block from '../../core/Block.ts'
import { render } from '../../core/render.ts'
import { loginValidationMessage, passwordValidationMessage } from '../../utils/constants.ts'
import { loginValidator, passwordValidator } from '../../utils/validators.ts'
import template from './login.hbs'

export class LoginPage extends Block {
    constructor() {
        super({
            inputs: [
                {
                    label: 'Login (Required)',
                    name: 'login',
                    validate: loginValidator,
                    validateMessage: loginValidationMessage,
                },
                {
                    label: 'Password (Required)',
                    name: 'password',
                    validate: passwordValidator,
                    validateMessage: passwordValidationMessage,
                },
            ],
            buttons: [
                {
                    label: 'Sign in',
                    classType: 'primary',
                    type: 'submit',
                    onClick: e => {
                        e.preventDefault()
                        console.log('🚀 ~ LoginPage ~ constructor ~ e.target:', e.target)

                        render('chatty')
                    },
                },
                {
                    label: 'Sign up',
                    classType: 'secondary',
                    type: 'button',
                    onClick: () => {
                        render('register')
                    },
                },
                {
                    label: '404',
                    classType: 'secondary',
                    type: 'button',
                    onClick: () => {
                        render('pageNotFound')
                    },
                },
                {
                    label: '500',
                    classType: 'secondary',
                    type: 'button',
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
