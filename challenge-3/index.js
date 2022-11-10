
// -------------- Challenge ---------------------

//---- Apuntes -----
// Async -> independiente Sync -> Simultaneo
// Posibles errores - Try & Catch

//requerimos promesas de fs



const express = require('express')
const fs = require('fs/promises');

const app = express()

app.get('/getProductos' , (req , res) => {
    res.send("hola")
})


app.get('/getProductosRandom' , (req , res) => {
    res.send("productos random")
})

const server = app.listen(8080 , () => {
    console.log('Servidor 8080 siendo escuchado')
})







class Container {

    constructor (fileName){
        this.fileName = fileName
    }

    async getAll(){

        try{

            let dataFile = await fs.readFile( this.fileName , { encoding: 'utf-8' })
            console.log(dataFile)
            return JSON.parse(dataFile)

        }catch(err){
            console.log(`Error a la hora de leer: ${err}`)
         }

    }

    async save(obj){

        try{
            let dataFile = await fs.readFile( this.fileName , { encoding: 'utf-8' })
            const products = JSON.parse(dataFile)

            const newProductId = products[products.length - 1].id + 1
            const newProduct = {...obj , id : newProductId}

            products.push(newProduct)

            await fs.writeFile(this.fileName , JSON.stringify(products, null , 2))

            return newProduct.id
        
        }catch{
            const newProduct = {...obj , id:1}
            await fs.writeFile(this.fileName , JSON.stringify([newProduct], null , 2))
            return newProduct.id
        }
    } 

    async getById(id){
        try{
            const products = await this.getAll()
            const productById = products.find((product) => product.id === id)

            if(!productById){
                return null
            }else{
                return productById
            }
        }catch(err){
            console.log(`No se encontró el producto, error: ${err}`)
        }
    }

    async deleteById(id){
        try{
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            if(!product){
                console.log(`No existe el producto de id:${id}`)
            }

            const newProducts = products.filter((product) => product.id !== id)
            await fs.writeFile(this.fileName , JSON.stringify(newProducts , null , 2))
        }catch(err){
            console.log(`No se borró el producto, error: ${err}`)
        }
    }

    async deleteAll(){
        try{
            await fs.writeFile(this.fileName , JSON.stringify([] , null , 2))
        }catch(err){
            console.log(`No se logró borrar todo, error: ${err}`)
        }
    }
}


let obj1 = {
    title : 'Carrito' , 
    price : 200 , 
    thumbnail : 'urlCarrito',
}

let obj2 = {
    title : 'Banco' , 
    price : 400 , 
    thumbnail : 'urlBanco',
}


let obj3 = {
    title : 'Cocina', 
    price : 2000 , 
    thumbnail : 'urlCocina',
}



const obj = new Container("index.txt")



async function main() {
    console.log(await obj.save(obj1))
    console.log(await obj.save(obj2))
    console.log(await obj.save(obj3))   

    //console.log(await obj.getById(2))
}

//main()

// obj.getAll()
//obj.getById(2)
//obj.deleteById(1)
//obj.deleteAll()
//main()

//---test passed :D--- If you wanna test it , descomment them.