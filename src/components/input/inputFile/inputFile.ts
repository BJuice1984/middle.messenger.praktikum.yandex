import UserController from '../../../controllers/UserController.ts'
import Block from '../../../core/Block.ts'
import template from './inputFile.hbs'

interface InputFileProps {
    name: string
    type: string
    extraClass: string
    [key: string]: unknown
}

export class InputFile extends Block<InputFileProps> {
    private formData: FormData
    constructor(props: InputFileProps) {
        super({
            ...props,
            events: {
                change: () => {
                    const fileInput = this.element as HTMLInputElement
                    const selectedFile = fileInput.files && fileInput.files[0]

                    if (selectedFile) {
                        this.formData.append(props.name, selectedFile)
                        void UserController.changeUserAvatar(this.formData)
                        this.formData.delete(props.name)
                    }
                },
            },
        })
        this.formData = new FormData()
    }

    render() {
        return this.compile(template, this.props as Record<string, string>)
    }
}
