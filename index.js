const express= require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config()
connectDb();
const app= express();
const PORT= process.env.PORT || 8000;

app.use(errorHandler)
app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoute'))
app.use('/api/users', require('./routes/userRoute'))
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})