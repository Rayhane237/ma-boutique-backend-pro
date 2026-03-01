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
app.use(cors())             // allows React (port 5173) to talk to Express (port 5000)
app.use(express.json())     // lets Express read JSON from request bodies

// ── Routes ──
// Any request to /api/products or messages gets handed to productRoutes/messageRoutes
app.use('/api/products', productRoutes)
app.use("/api/messages", messageRoutes)

// ── Connect to MongoDB then start server ──
// We connect to DB FIRST, only then open the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(5000, () => console.log('✅ Server running on port 5000'))
  })
  .catch((err) => console.log('❌ Connection failed:', err))