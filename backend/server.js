import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import alumniRouter from './routes/alumniRoute.js'
import galleryRoute from './routes/galleryRoute.js';
import eventsRouter from './routes/eventsRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/alumni', alumniRouter)
app.use('/api/gallery', galleryRoute);
app.use('/api/events', eventsRouter);
app.use('/api/user', userRouter);

app.get('/', (req,res)=>{
    res.send('API WORKING')
})

const start = async () => {
  await connectDB()
  connectCloudinary()
  app.listen(port, () => console.log("Server Started", port))
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})