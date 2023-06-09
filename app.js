const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

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
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404 ).render('404', {title: '404'})
})