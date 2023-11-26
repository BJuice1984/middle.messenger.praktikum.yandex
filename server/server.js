import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const port = 3000
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '../dist')))

app.listen(port, () => {
    console.log('server started on ' + port)
})
