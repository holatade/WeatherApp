const path = require('path')
const express = require('express')
// loading hbs for partials
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

const app = express()
// Acesss environment variale port for heroku
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//set handlebars for dynamic templating
app.set('view engine','hbs')
//set views directory path
app.set('views',viewDirectoryPath)
//register partials
hbs.registerPartials(partialsPath)

//Use static files
app.use(express.static(publicDirectoryPath))

//set route for handle bars
app.get('',(req,res) => {
    // render allows us to render views
    // with render, we can render our hbs templates
    res.render('index',{
        title:'Weather',
        name: 'Hassan Hassan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message: 'Allah please help me',
        name : 'Hassan Hassan'
    })
})

app.get('/about',(req,res)  => {
    res.render('about',{
        title:'About Me',
        name : 'Hassan Hassan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }
    geocode( req.query.address,(error,data) => {
        if(error){
            return res.send({error})
        }
        forecast(data,(error,cast) => {
            if(error){
                return res.send({error})
            }
            return res.send({
                forecast : cast,
                location:data.location,
                address:req.query.address
            }) 
        })
    })
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title:"404 page",
        name : 'Hassan Hassan',
        errorMessage: "Help article not found"
    })
})



app.get('*',(req,res) => {
    res.render('404', {
        title: "404 page",
        name : 'Hassan Hassan',
        errorMessage: "My 404 page"
    })
    
})

app.listen(port,() => {
    console.log('Server is up on port '+ port)
})
