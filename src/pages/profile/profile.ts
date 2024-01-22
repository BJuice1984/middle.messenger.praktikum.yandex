import Block from '../../core/Block.ts'
import { render } from '../../core/render.ts'
import template from './profile.hbs'
import {
    loginValidationMessage,
    mailValidationMessage,
    nameValidationMessage,
    passwordValidationMessage,
    phoneValidationMessage,
} from '../../utils/constants.ts'
import {
    loginValidator,
    mailValidator,
    nameValidator,
    passwordValidator,
    phoneValidator,
} from '../../utils/validators.ts'

export class ProfilePage extends Block {
    constructor() {
        super({
            inputs: [
                {
                    label: 'EMAIL',
                    name: 'email',
                    validate: mailValidator,
                    validateMessage: mailValidationMessage,
                },
                {
                    label: 'Login',
                    name: 'login',
                    validate: loginValidator,
                    validateMessage: loginValidationMessage,
                },
                {
                    label: 'First Name',
                    name: 'first_name',
                    validate: nameValidator,
                    validateMessage: nameValidationMessage,
                },
                {
                    label: 'Last Name',
                    name: 'second_name',
                    validate: nameValidator,
                    validateMessage: nameValidationMessage,
                },
                {
                    label: 'Phone Number',
                    name: 'phone',
                    validate: phoneValidator,
                    validateMessage: phoneValidationMessage,
                },
                {
                    label: 'New password',
                    name: 'password',
                    validate: passwordValidator,
                    validateMessage: passwordValidationMessage,
                },
                {
                    label: 'Confirm new password',
                    name: 'confirm_password',
                    validate: passwordValidator,
                    validateMessage: passwordValidationMessage,
                },
            ],
            buttons: [
                {
                    label: 'Reset changes',
                    classType: 'disabled',
                    type: 'submit',
                    handleClick: () => {
                        render('profile')
                    },
                },
                {
                    label: 'Sign out',
                    classType: 'secondary',
                    type: 'button',
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
