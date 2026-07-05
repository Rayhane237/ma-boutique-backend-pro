import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"
import { connectDB } from './config/DATABASE.js'

console.log('MONGO_URI:', process.env.MONGO_URI)

const app = express()

app.use(cors())
app.use(express.json())

// ── Routes ──
app.use('/api/products', productRoutes)
app.use("/api/messages", messageRoutes)

// Changez '/test' par '/api/test'
app.get('/api/test', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ 
      dbName: mongoose.connection.db.databaseName,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000

app.use(
  //This allows both your local dev version and your live deployed frontend.
  cors({
    origin: ['http://localhost:5173',
    'https://ma-boutiqhe-frontend-pro-pn7e.vercel.app']
  })
)

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log('Connection failed:', err))
