import { defineConfig } from 'vite'
import { resolve } from 'path'
import vitePluginHandlebarsPrecompile from './vite-plugin-handelbars-precompile'

export default defineConfig({
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    server: {
        port: 3000,
    },
    plugins: [vitePluginHandlebarsPrecompile()],
})
