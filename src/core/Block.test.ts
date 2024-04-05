import { expect } from 'chai'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'
import Block, { Props } from './Block'

const dom = new JSDOM()
global.document = dom.window.document

interface PageProps {
    text: string
    [key: string]: unknown
}

describe('Block', () => {
    let PageClass: new (props?: Props | PageProps) => Block<Props>

    before(() => {
        class Page extends Block {
            constructor(props?: Props | PageProps) {
                super(props)
            }

            render() {
                const fragment = document.createDocumentFragment()
                const div = document.createElement('div')
                const p = document.createElement('p')
                p.id = 'test-text'
                p.innerHTML = String((this.props as unknown as PageProps)?.text)
                div.appendChild(p)
                fragment.appendChild(div)
                return fragment
            }
        }

        PageClass = Page
    })

    it('Must create component with props', () => {
        const text = 'Test'
        const pageComponent = new PageClass({ text })
        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML
        expect(spanText).to.be.eq(text)
    })

    it('Must be reactive', () => {
        const text = 'new value'
        const pageComponent = new PageClass({ text: 'Hello' })
        pageComponent.setProps({ text })
        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML
        expect(spanText).to.be.eq(text)
    })

    it('Must set events', () => {
        const handlerStub = sinon.stub()
        const pageComponent = new PageClass({
            events: {
                click: handlerStub,
            },
        })
        const event = new MouseEvent('click')
        pageComponent.element?.dispatchEvent(event)
        expect(handlerStub.calledOnce).to.be.true
    })

    it('Must call componentDidMount method', () => {
        const pageComponent = new PageClass()
        const componentDidMountMock = sinon.stub(pageComponent, 'componentDidMount')
        pageComponent.dispatchComponentDidMount()
        expect(componentDidMountMock.calledOnce).to.be.true
    })
})
