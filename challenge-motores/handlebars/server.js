const express = require('express')

const app = express()

const handlebars = require("express-handlebars")

let productos = [
    {
        title : 'Computadora' , 
        price : 200 , 
        thumbnail : 'https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Computer-64.png',
    },
    {

        title : 'Maletín' , 
        price : 400 , 
        thumbnail : 'https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Business_case-64.png',
    },
    {
        title : 'Cámara', 
        price : 2000 , 
        thumbnail : 'https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Camera-64.png',
    },
    {
        title : 'Telescopio', 
        price : 4000 , 
        thumbnail : 'https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Science_1-64.png',
    },
]

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.engine('handlebars' , handlebars.engine())
app.set('view engine' , 'handlebars')
app.set('views' , './views' )


//get 

app.get('/' , (req , res) => {
    res.render('formulario' , {productos})
})


//post

app.post('/productos' , (req, res) => {

    let productosExiste = false

    if(productos.length > 0){
        productosExiste = true
    }

    productos.push(req.body)

    res.render('historial' , {productos , productosExiste})
})

app.listen(8080)