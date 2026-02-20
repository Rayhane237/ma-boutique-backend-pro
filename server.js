const express = require("express") //framework that runs my server
const mongoose = require("mongoose") //library  to connect to MongoDB and define my data models
const cors = require("cors") //allows my frontend to make requests to my backend without running into cross-origin issues
require("dotenv").config() // reads my .env file and makes the variables available in process.env

const app = express()
app.use(cors()) // allow frontend requests
app.use(express.json()) // allow the server to read JSON data sent in requests

//connect to mongodb then start server 
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("mongodb conncted");

    //only start server if db connected successfully
    const PORT = process.env.PORT || 5000
      app.listen(PORT , ()=> {
        console.log(`Server running on port ${PORT}`);
      })
    })

    .catch((error)=> {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1) // exit with failure code
    
    })
    app.use("/api/products" , require("./routes/products"))

