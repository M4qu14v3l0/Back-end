const express = require('express')

const { Router } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


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

routerProductos.get('/:id' , (req , res) => {

    console.log('Get por ID recibido')

    const productById = productos.find(e => e.id == req.params.id)  

    if(productById !== undefined){
        res.send(productById)
    }else{
        res.json({Error: `No existe un producto de id: ${req.params.id}`})
    }
})


routerProductos.put('/:id' , (req , res) => {
    console.log(' Put recibido')
    productById = productos.findIndex( x => x.id == req.params.id)
    productos[productById] = req.body

    res.json({ok: 'ok'})
})


routerProductos.delete('/:id' , (req , res) => {
    
    console.log('delete recibido')
    const id = req.params.id;

    productos = productos.filter((x) => x.id != id)
    console.log(productos)
    res.send(productos)
})

app.use('/api/productos' , routerProductos)


