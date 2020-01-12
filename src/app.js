// path module used to manipulkate path

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodegmap = require('./utils/geocodegmap.js')
const forecast = require('./utils/forecast.js')

const app = express()


// Define Paths for Express Config

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Define settings for express public static directory

app.use(express.static(publicDirectory))

// COnfiguration of handlebars template engine

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// This is how to call the handlebars view

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Don Brooks'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Current Warlord',
        name: 'Don Brooks',
        title: 'About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'This is the help message',
        name: 'Don Brooks',
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Error: You must enter an address')
    }

    geocodegmap(req.query.address, (error,{latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })

    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        message: "Sorry Help file not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: "Sorry Page not found!!"
    })
})

app.listen(3000, () => {
    console.log('Web server started on port 3000')
})


// app.com
// app.com/help  <---- Routes to various pages