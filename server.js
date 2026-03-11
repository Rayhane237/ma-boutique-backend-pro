// backend/server.js

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"

dotenv.config()       // loads your .env file
const app = express() // creates your server

// Option 2: Allow specific origins (recommended for production)
const allowedOrigins = [
  'https://ma-boutiqhe-frontend-pro-cilj.vercel.app/', // React dev server
     // Your production frontend URL
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // If you're sending cookies or authorization headers
}));

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