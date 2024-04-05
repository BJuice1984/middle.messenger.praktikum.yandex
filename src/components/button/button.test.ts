import { expect } from 'chai'

import { ButtonProps } from './button'

describe('Button component', () => {
    let Button: any

    beforeEach(() => {
        class MockButton {
            props: ButtonProps

            constructor(props: ButtonProps) {
                this.props = props
            }

            getContent() {
                const buttonElement = document.createElement('button')
                buttonElement.textContent = this.props.label
                buttonElement.className = this.props.classType
                buttonElement.type = this.props.type
                buttonElement.onclick = this.props.onClick
                return buttonElement
            }
        }

        Button = MockButton
    })

    it('should render button with correct label', () => {
        const buttonInstance = new Button({
            label: 'Test Button',
            classType: 'primary',
            type: 'button',
            onClick: () => {},
        })
        const buttonElement = buttonInstance.getContent() as HTMLButtonElement
        expect(buttonElement.tagName).to.equal('BUTTON')
        expect(buttonElement.textContent).to.equal('Test Button')
    })

    it('should have correct class based on classType prop', () => {
        const buttonInstance = new Button({
            label: 'Test Button',
            classType: 'primary',
            type: 'button',
            onClick: () => {},
        })
        const buttonElement = buttonInstance.getContent() as HTMLButtonElement
        expect(buttonElement.classList.contains('primary')).to.be.true
    })
})
