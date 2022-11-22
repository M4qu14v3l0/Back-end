const express = require('express')

const { Router } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//global variable

let productos = [
    {
        id : 1 ,
        title : 'Carrito' , 
        price : 200 , 
        thumbnail : 'urlCarrito',
    },
    {
        id : 2,
        title : 'Banco' , 
        price : 400 , 
        thumbnail : 'urlBanco',
    },
    {
        id : 3,
        title : 'Cocina', 
        price : 2000 , 
        thumbnail : 'urlCocina',
    },
]

const server = app.listen(8080 , () => {
    console.log('Servidor 8080 siendo escuchado')
})


const routerProductos = new Router()

routerProductos.get('/' , (req , res) => {
    console.log('Get recibido')
    res.send(productos)
})

routerProductos.post('/' , (req , res) => {
    console.log('Post recibido')
    try{
        const newProductoId = productos[productos.length - 1].id + 1
        const newProducto = {...req.body, id :  newProductoId}
        productos.push(newProducto)
        res.send(productos)
    }catch{
        const newProducto = {...req.body , id:1}
        productos.push(newProducto)
        res.send(productos)
    }
})

routerProductos.get('/:id' , checkId ,(req , res) => {

    console.log('Get por ID recibido')

    const productById = productos.find(e => e.id == req.params.id)  

    res.send(productById)

})


routerProductos.put('/:id' , checkId , (req , res) => {
    console.log(' Put recibido')

    const productById = productos.find(e => e === req.params.id)

    const index = productos.indexOf(productById)

    productos.splice(index - 1, 1 , req.body)
    
    res.json({ok: 'ok'})
    })




routerProductos.delete('/:id' , checkId ,(req , res) => {
    
    console.log('delete recibido')
    const id = req.params.id;
    // productos sigue siendo el mismo array que defino arriba, profe, por eso no le puse let o const, ya que en el array de la línea 11 ya le puse el let
    // filtrar ("eliminar") lo estoy haciendo en el mismo array que contiene mis productos
    productos = productos.filter((x) => x.id != id)
    res.send(productos)
})

app.use('/api/productos' , routerProductos)


//Middleware

function checkId(req , res , next){
    if(productos.find(e => e.id == req.params.id)){
        next()
    }else{
        res.json({error: 'producto no encontrado'})
    }
}


