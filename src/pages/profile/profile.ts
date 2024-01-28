import Block from '../../core/Block.ts'
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
import AuthController from '../../controllers/AuthController.ts'

export class ProfilePage extends Block {
    constructor() {
        super({
            user: {
                first_name: 'Almayra Zamzamy',
                phone: '+7(987)123-4554',
                email: 'xxxx@yyyy.zz',
            },
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
                        console.log('Reset changes')
                    },
                },
                {
                    label: 'Sign out',
                    classType: 'secondary',
                    type: 'button',
                    onClick: () => {
                        void AuthController.logout()
                    },
                },
            ],
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
