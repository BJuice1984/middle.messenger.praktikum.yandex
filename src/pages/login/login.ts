export { default as LoginPage } from './login.hbs?raw'

export interface InputData {
    label: string
}

export interface ButtonData {
    label: string
    classType: 'primary' | 'secondary'
    page: string
}

export interface LoginPageData {
    test: string
}
