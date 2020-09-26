const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')
const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()

//DEFINE PATHS TO EXPRESS CONFIG, to set up handlebars engine and views location.
//to set templating engine,hbs for dynamic type of site.
app.set('view engine','hbs') 
app.set('views' , path.join(__dirname, '../templates/views'))

hbs.registerPartials(path.join(__dirname, "../templates/partials"))

//expres.get() makes server more customize.inside express.static function takes path of the directory from which all files are to be
//included in server. Then, when we provide (eg.) localhost:3000/help.html path, all the containts from that page gets displyed.
// When express.get() used we provided localhost:3000/help path to execute res.send() function there. Bt that cann't be on large scale.
app.use(express.static(path.join(__dirname, "../public")))//setup staric deirectory to serve.

//render allows us to render one of our views.1st arg is name of particular view name we wanna render.2nd argv is an obj which constains
//all the values u want that view to be able to access.
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Siddhi Wakchaure'
    })
})
app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About Me',
        name: 'Siddhi Wakchaure'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Siddhi Wakchaure'
    })
})

//experss.get() this lets us configure what the server do when the user accesses particular route.
//it takes 2 args. 1st is route of the page and 2nd is function, what is to be shown on that page.
//That callback funct takes two args, 1st one request, is the OBJECT containing info of incomig request to the server.
//2nd is response, it contains methods decides wht we are sending bak to requestor.
//we are on the server-side.        
app.get("/weather",(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        //return statement stops the code there only if error occured. avoids writting further part in else.
        forecast(data.latitude,data.longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : data.location,
                address : req.query.address,
            })
            
          })
    })


})

app.get('/products',(req, res)=>{

    if (!req.query.rate) {
        return res.send({
            Error: 'You must provide a rate term!'
        })
    }

    console.log(req.query.rate)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: "404 ERROR!",
        errorMessage: 'Help article not found.',
        name:'Siddhi Wakchaure'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: "404 ERROR!",
        errorMessage: 'Page not found.',
        name: 'Siddhi Wakchaure'
    })
})


//this takes port no. as an argument where all of your work is going to be diaplyed. It stats the server and listens
//on a particular port. port 3000 is a common developer port. which is not a default port. And further callback function shows to us
//on terminal.this server is always up and running unless we stop it by control C on terminal.
app.listen(3000,()=>{
    console.log("Your server is up on port 3000!")
})
