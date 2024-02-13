require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');


// import routes
const recipeRoutes = require('./routes/recipeRoutes')
const userRoutes = require('./routes/userRoutes')

const port = 3000;

const app = express();


// middlewear
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);


mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        app.listen(port, ()=> {
            console.log("Connected to database and listening on port ", port);
        });
    })
    .catch((err)=>{
        console.log(err);
    })
