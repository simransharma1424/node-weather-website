const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geo = require('../utils/geocode')
const fore = require('../utils/forecast.js')

const app = express()
const port = process.env.PORT || 3001

pathDirectory = path.join(__dirname, '../public')
viewDirectory = path.join(__dirname, '../templates/views')
partials = path.join(__dirname, '../templates/partials')


//app.set(key, value) --> to set handlebars for express
//to set up HBS and views directories dynamically
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partials)

//to set up static directory of views
app.use(express.static(pathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Simran'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us!!!',
        name: 'Simran Sharma'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'HELP ME',
        name: 'Simran Sharma'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            'error': 'No address provided!!!'
        })
    }
    geo.geocode(req.query.address, (error, {latitude: lat, longitude: long, location: loc}={}) => {
        if(error===undefined){
            fore.forecast(lat, long, (error, response) => {
                if(error===undefined){
                    return res.send({
                        'response': response,
                        'Latitude': lat,
                        'Longitude': long,
                        'Location': loc
                    })
                }
                res.send({
                    'error': error
                })
            })
        }else{
            res.send({
                'error': error,
                'description': 'Error in geocode!!'
            })
        }
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404 Error Page',
        name: 'Simran Sharma'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        message: 'About article not found',
        title: '404 Error Page',
        name: 'Simran Sharma'
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        message: 'Article not found',
        title: '404 Error Page',
        name: 'Simran Sharma'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})