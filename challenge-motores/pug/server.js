const express = require('express')

const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views','./views')
app.set('view engine' , 'pug')

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




//get 

app.get('/' , (req , res) => {
    res.render('historial' , {productos})
})

app.get('/form' , (req , res) => {
    res.render('formulario')
})


//post

app.post('/productos' , (req, res) => {

    productos.push(req.body)
    console.log(req.body)
    res.redirect('/')
})

app.listen(8080)