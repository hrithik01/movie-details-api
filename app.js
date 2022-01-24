import express from 'express'
import 'dotenv/config'
import { searchMovieDB, searchTitleDB } from './routeFunctions/index.js'

const app = new express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/search', searchMovieDB)
app.get('/search/:id', searchTitleDB)

app.listen(port, () => {
    console.log('Server started on port ' + port)
})
