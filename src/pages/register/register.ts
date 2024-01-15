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
                    onFocusout: e => console.log(e.target.value),
                },
                {
                    label: 'Login',
                    name: 'login',
                    onFocusout: e => console.log(e.target.value),
                },
                {
                    label: 'First Name',
                    name: 'first_name',
                    onFocusout: e => console.log(e.target.value),
                },
                {
                    label: 'Last Name',
                    name: 'second_name',
                    onFocusout: e => console.log(e.target.value),
                },
                {
                    label: 'Phone Number',
                    name: 'phone',
                    onFocusout: e => console.log(e.target.value),
                },
                {
                    label: 'Password',
                    name: 'password',
                    onFocusout: e => console.log(e.target.value),
                },
                {
                    label: 'Confirm Password',
                    name: 'confirm_password',
                    onFocusout: e => console.log(e.target.value),
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
