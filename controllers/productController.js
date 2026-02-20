// The logic — what happens when someone asks for products.

//this imports the Product model we just created. Now this file can use it to talk to the database.
//  The ../ means "go one folder up" to find the models folder.
const Product = require('../models/Products');

//functio1:get all products from the database and send them back to the client as JSON.
exports.getProducts =async (req ,res)=> {
    try{
        const products =await Product.find();
        res.json(products)
    }catch(error){
        res.statuse(500).json({message: error.message})
    }
}
//function2: get a single product by its ID, which is sent in the URL as a parameter. If the product is found, it is sent back as JSON. If not, a 404 error is returned.
exports.getProductById = async (req,res)=>{
    try{
       const product = await Product.findById(req.params.id)
       if(!product){
        return res.status(404).json({message: "Product not found"})
       }
       res.json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//funtion3: create a new product in the database using the data sent by the client in the request body.
exports.createProduct = async (req ,res)=> {
    try{
       const newProduct = new Product(req.body)
       const saved = await newProduct.save()
       res.status(201).json(saved)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}