import { expect } from 'chai'
import Router from './Router'
import Block, { Props } from '../core/Block'

describe('Router test', () => {
    let TestBlock: new (props?: Props) => Block<Props>
    let appElement: HTMLElement

    before(() => {
        appElement = document.createElement('div')
        appElement.id = 'app'
        document.body.appendChild(appElement)

        class TestComponent extends Block {
            constructor(props?: Props) {
                super(props)
            }

            render() {
                const fragment = document.createDocumentFragment()
                const div = document.createElement('div')
                const p = document.createElement('p')
                p.id = 'test-text'
                p.innerHTML = String(this.props?.text)
                div.appendChild(p)
                fragment.appendChild(div)
                return fragment
            }
        }
        TestBlock = TestComponent
    })

    afterEach(() => {
        window.history.pushState(null, '', '/')
        appElement.innerHTML = ''
    })

    after(() => {
        appElement.remove()
    })

    it('should navigate between routes', () => {
        Router.use('/test', TestBlock as typeof Block)
        Router.go('/test')
        expect(window.history.length).to.eq(2)
        expect(window.location.pathname).to.eq('/test')
    })

    it('should go back', () => {
        Router.use('/test', TestBlock as typeof Block)
        Router.go('/')
        Router.go('/test')
        Router.back()
        expect(window.location.pathname).to.eq('/test')
    })

    it('should go forward', () => {
        Router.use('/test', TestBlock as typeof Block)
        Router.go('/')
        Router.go('/test')
        Router.back()
        Router.forward()
        expect(window.location.pathname).to.eq('/test')
        expect(window.history.length).to.eq(8)
    })
})
