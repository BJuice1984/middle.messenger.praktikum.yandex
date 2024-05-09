import { expect } from 'chai'

import { InputProps } from './input'

describe('Input component', () => {
    let Input: any

    beforeEach(() => {
        class MockInput {
            props: InputProps
            element: HTMLInputElement | null

            constructor(props: InputProps) {
                this.props = props
                this.element = document.createElement('input')
            }

            getValue() {
                return this.element ? this.element.value : ''
            }

            setValue(value: string) {
                if (this.element) {
                    this.element.value = value
                }
            }

            render() {
                return this.props.label
            }
        }

        Input = MockInput
    })

    it('should get and set value correctly', () => {
        const inputValue = 'Test Value'
        const inputInstance = new Input({
            onBlur: () => {},
            label: 'Input Label',
            name: 'inputName',
            events: {
                blur: () => {},
            },
        })

        inputInstance.setValue(inputValue)
        expect(inputInstance.getValue()).to.equal(inputValue)
    })

    it('should render label correctly', () => {
        const inputLabel = 'Input Label'
        const inputInstance = new Input({
            onBlur: () => {},
            label: inputLabel,
            name: 'inputName',
            events: {
                blur: () => {},
            },
        })

        const renderedLabel = inputInstance.render()
        expect(renderedLabel).to.equal(inputLabel)
    })
})
