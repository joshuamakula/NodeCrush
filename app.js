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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Another good Blog',
        snippet: 'About a new blog',
        body: 'More about the new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// get mongodb data
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// get single data
app.get('/single-blog', (req, res) => {
    Blog.findById('6453c4e48bd67182518440b8')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
        {title: 'Maria finds stars', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    ]
    res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'})
})

// 404 page
app.use((req, res) => {
    res.status(404 ).render('404', {title: '404'})
})