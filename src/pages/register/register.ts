import Block from '../../core/Block.ts'
import template from './register.hbs'
import { render } from '../../core/render.ts'

export class RegisterPage extends Block {
    constructor() {
        super({
            inputs: [
                {
                    label: 'EMAIL',
                    name: 'email',
                },
                {
                    label: 'Login',
                    name: 'login',
                },
                {
                    label: 'First Name',
                    name: 'first_name',
                },
                {
                    label: 'Last Name',
                    name: 'second_name',
                },
                {
                    label: 'Phone Number',
                    name: 'phone',
                },
                {
                    label: 'Password',
                    name: 'password',
                },
                {
                    label: 'Confirm Password',
                    name: 'confirm_password',
                },
            ],
            buttons: [
                {
                    label: 'Sign up',
                    classType: 'disabled',
                    onClick: () => {
                        render('chatty')
                    },
                },
                {
                    label: 'Sign in',
                    classType: 'secondary',
                    onClick: () => {
                        render('login')
                    },
                },
            ],
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
