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
                    handleClick: () => {
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
            ],
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
