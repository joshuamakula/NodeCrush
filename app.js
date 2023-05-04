const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./model/blogs')
const { result } = require('lodash')

// express app
const app = express()

// Connect to mongobd
const dbURI = 'mongodb+srv://admin:admin@cluster0.w6udrr2.mongodb.net/crush?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))

//  register view engine
app.set('view engine', 'ejs')

// listen for request
app.listen(3000)

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'})
})

// 404 page
app.use((req, res) => {
    res.status(404 ).render('404', {title: '404'})
})