import { render } from './core/render.ts'
import { registerComponent } from './core/registerComponent.ts'
import * as Components from './components/components.ts'
import Block from './core/Block.ts'

Object.entries(Components).forEach(([name, component]) => {
    registerComponent(name, component as typeof Block)
})

document.addEventListener('DOMContentLoaded', () => render('login'))
