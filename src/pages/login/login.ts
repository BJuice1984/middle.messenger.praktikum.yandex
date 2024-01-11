export { default as LoginPage } from './login.hbs?raw'
import Block from '../../core/Block.ts'
import template from './login.hbs'
// import { render } from '../../core/render.ts'

export class Login extends Block {
    constructor() {
        super()
    }

    render() {
        return this.compile(template, this.props as Record<string, unknown>)
    }
}

// export interface InputData {
//     label: string
// }

// export interface ButtonData {
//     label: string
//     classType: 'primary' | 'secondary'
//     page: string
// }

// export interface LoginPageData {
//     test: string
// }
