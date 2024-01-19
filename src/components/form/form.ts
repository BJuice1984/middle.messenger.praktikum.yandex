import Block from '../../core/Block.ts'
import template from './form.hbs'

interface FormProps {
    inputs: {
        label: string
        name: string
        validateMessage: string
        // eslint-disable-next-line no-unused-vars
        validate: (value: string) => boolean // Изменили тип функции валидации
    }[]
    buttons: {
        label: string
        classType: string
        onClick?: () => void
        handleClick?: () => void
    }[]
}

export class Form extends Block {
    constructor(props: FormProps) {
        super({
            ...props,
            events: {
                submit: e => {
                    e.preventDefault()

                    if (this._validateInputs()) {
                        console.log('Форма ДА!')

                        const buttonWithHandleClick = this.props.buttons.find(
                            button => button.handleClick
                        )

                        if (buttonWithHandleClick) {
                            buttonWithHandleClick.handleClick()
                            const formData = this._serializeForm(this.element)

                            console.log(formData)
                        }
                    } else {
                        console.log('Форма НЕ!')
                    }
                },
            },
        })
        console.log(this.refs.error)
    }

    _validateInputs(): boolean {
        for (const input of this.props.inputs) {
            const inputElement = this.element.querySelector(
                `[name="${input.name}"]`
            ) as HTMLInputElement

            if (inputElement && !input.validate(inputElement.value)) {
                console.log(`Ошибка валидации на ${input.name}`)

                return false
            }
        }

        return true
    }

    _serializeForm(formNode: HTMLFormElement): Record<string, string> {
        const { elements } = formNode

        const data = Array.from(elements)
            .filter(item => Boolean(item.name))
            .reduce((acc, element) => {
                const { name, value } = element

                acc[name] = value

                return acc
            }, {})

        return data
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
