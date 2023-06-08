require('dotenv').config()

const express = require('express')

const app = express()

const blogsRouter = require('./controllers/blogs')

const cors = require('cors')

const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app