/// <reference types="vite/client" />

declare module '*.hbs' {
    import { TemplateDelegate } from 'handlebars'

    declare const template: TemplateDelegate

    export default template
}
