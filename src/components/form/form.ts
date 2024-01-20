import Block from '../../core/Block.ts'
import template from './form.hbs'

interface FormButton {
    label: string
    classType: string
    onClick?: () => void
    handleClick?: () => void
}

interface FormProps {
    inputs: {
        label: string
        name: string
        validateMessage: string
        // eslint-disable-next-line no-unused-vars
        validate: (value: string) => boolean
    }[]
    buttons: FormButton[]
    [key: string]: unknown
}

export class Form extends Block<FormProps> {
    constructor(props: FormProps) {
        super({
            ...props,
            events: {
                submit: (e: { preventDefault: () => void }) => {
                    e.preventDefault()

                    if (this._validateInputs()) {
                        console.log('Форма ДА!')

                        const buttonWithHandleClick: Partial<FormButton> | undefined =
                            this.props.buttons.find((button: FormButton) => button.handleClick)

                        if (buttonWithHandleClick && this.element instanceof HTMLFormElement) {
                            if (buttonWithHandleClick.handleClick) {
                                buttonWithHandleClick.handleClick()
                                const formData = this._serializeForm(this.element)

                                console.log(formData)
                            }
                        }
                    } else {
                        console.log('Форма НЕ!')
                    }
                },
            },
        })
        console.log('🚀 ~ Form ~ this.element:', this.element)
    }

    _validateInputs(): boolean {
        for (const input of this.props.inputs) {
            const inputElement = this.element?.querySelector(
                `[name="${input.name}"]`
            ) as HTMLInputElement

            if (!input.validate(inputElement.value)) {
                console.log(`Ошибка валидации на ${input.name}`)

                return false
            }
        }

        return true
    }

    _serializeForm(formNode: HTMLFormElement): Record<string, string> {
        const { elements } = formNode

        const data = Array.from(elements)
            .filter(item => Boolean((item as HTMLInputElement).name))
            .reduce<Record<string, string>>((acc, element) => {
                const { name, value } = element as HTMLInputElement

                acc[name] = value

                return acc
            }, {})

        return data
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
