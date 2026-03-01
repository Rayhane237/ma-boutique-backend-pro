import express from 'express'
import Product from '../models/Products.js'  // ← .js extension required

const router = express.Router()// creates a mini-server for products routes

// GET /api/products -> get all products
router.get("/" ,async (req,res)=>{
    try{
        const products = await Product.find()
        res.json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET /api/products/:id -> get one product by id
router.get("/:id" ,async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product) 
            return res.status(404).json({message: "Product not found"})
        res.json(product)
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({message: "Invalid product sku"})
        }
        res.status(500).json({message: error.message})
    }
})

// POST /api/products -> create a new product
router.post("/" ,async (req,res)=>{
    try{
        const product = new Product(req.body)
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// PUT /api/products/:id -> update a product by id
router.put("/:sku" ,async (req,res)=>{
    try{
        const updatedProduct = await Product.findOneAndUpdate(
            {sku: req.params.sku},   //which product to update
            req.body,       //what to change
            {new:true}     // return the updated version
        )
        if(!updatedProduct) 
            return res.status(404).json({message: "Product not found"})
        res.json(updatedProduct)

    }catch(error){
            return res.status(400).json({message: error.message})
    }
})

// DELETE /api/products/:id -> delete a product by id
router.delete("/:sku" ,async (req,res)=>{
    try{
        const deletedProduct = await Product.findOneAndDelete({sku: req.params.sku})
        if(!deletedProduct) 
            return res.status(404).json({message: "Product not found"})
        res.json({message: "Product deleted successfully"})
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({message: "Invalid product sku"})
        }
        res.status(500).json({message: error.message})
    }
})

export default router


//router.METHOD('/path', async (req, res) => {
  try {
    // talk to MongoDB
    // send back result
  } catch (error) {
    // something went wrong
    // send back error
  }
//})
