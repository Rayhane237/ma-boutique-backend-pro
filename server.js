// backend/server.js

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"

dotenv.config()       // loads your .env file
const app = express() // creates your server

// ── Middleware ──
// These 2 lines run on EVERY request before it hits your routes
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ma-boutiqueadeline-aaqdiwj8n-tliba-raihanes-projects.vercel.app/'  // replace with your actual frontend URL
  ],
  credentials: true
}))           // allows React (port 5173) to talk to Express (port 5000) ,and my deployed frontend to talk to my deployed backend
app.use(express.json())     // lets Express read JSON from request bodies

// ── Routes ──
// Any request to /api/products or messages gets handed to productRoutes/messageRoutes
app.use('/api/products', productRoutes)
app.use("/api/messages", messageRoutes)

// ── Connect to MongoDB then start server ──
// Connect to DB FIRST, only then open the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log(' Connection failed:', err))