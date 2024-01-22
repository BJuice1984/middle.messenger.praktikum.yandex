import { render } from './core/render.ts'
import { registerComponent } from './core/registerComponent.ts'
import * as Components from './components/components.ts'

Object.entries(Components).forEach(([name, component]) => {
    registerComponent(name, component)
})

document.addEventListener('DOMContentLoaded', () => render('login'))
