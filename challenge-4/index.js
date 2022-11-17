const express = require('express')

const app = express()

const productos = [
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

app.get('/api/productos' , (req , res) => {
    console.log('Get recibido')

    res.send(productos)
})

app.get('/api/productos/:id' , (req , res) => {
    console.log('Get por ID recibido')

    productById = productos.find(e => e.id == req.params.id)
    
    res.send(productById)
})

app.post('/api/productos' , (req , res) => {
    console.log('Post recibido')

    try{

        const newProductoId = productos[productos.length - 1].id + 1
        const newProducto = {...req.body , id : newProductoId}
        productos.push(newProducto)
        res.send(productos)
    
    }catch{
        const newProducto = {...req.body , id:1}
        newProducto.id
        res.send(productos)
    }
})

app.put('/api/productos/:id' , (req , res) => {
    console.log(' Put recibido')

    productById = productos.find(e => e === req.params.id)
    productById = req.body

    res.send(productos)

})

app.delete('/api/productos/:id' , (req , res) => {
    console.log('delete receibido')

    deleteProducto = productos.filter((e) => e !== req.params.id)

    productos = deleteProducto

    res.send(productos)
})


