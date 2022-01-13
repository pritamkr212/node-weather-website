const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port=process.env.PORT ||3000;


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pritam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pritam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Pritam'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address',
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)return res.send({error});

        forecast(latitude, longitude, (error, ForecastData) => {
            if(error)return req.send({error})
            return res.send({
                address:req.query.address,
                forecast:ForecastData,
                location
            })
        })
    })
})




app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide the search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:['gta','rrd'],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pritam',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pritam',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})