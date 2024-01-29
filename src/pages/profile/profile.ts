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
import { withStore } from '../../utils/Store.ts'

class ProfilePageBase extends Block {
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

const withUser = withStore(state => ({
    user: {
        first_name: state.user?.first_name,
        second_name: state.user?.second_name,
        email: state.user?.email,
        login: state.user?.login,
        phone: state.user?.phone,
    },
}))

export const ProfilePage = withUser(ProfilePageBase as typeof Block)
