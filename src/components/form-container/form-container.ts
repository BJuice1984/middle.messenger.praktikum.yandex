import Block from '../../core/Block.ts'
import { emptyValidationMessage } from '../../utils/constants.ts'
import { emptyValidator } from '../../utils/validators.ts'
import { FormButton, FormInputs } from '../form/form.ts'
import template from './form-container.hbs'

interface FormContainerProps {
    formContainerExtraClass: string
    isShown: boolean
    inputs: FormInputs[]
    buttons: FormButton[]
}

export class FormContainer extends Block {
    constructor(props: FormContainerProps) {
        super({
            ...props,
            inputs: [
                {
                    label: 'type user name',
                    name: 'login',
                    validate: emptyValidator,
                    validateMessage: emptyValidationMessage,
                },
            ],
            buttons: [
                {
                    label: 'add user',
                    classType: 'primary',
                    type: 'submit',
                    handleSubmitClick: (value: string) => {
                        console.log(value)
                    },
                },
            ],
        })
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}
