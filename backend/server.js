require('dotenv').config();

if (process.env){
    console.log('process.env = true')
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// import routes
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

const app = express();

// middlewear
app.use(cors({
    origin: false
}))

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.get('/', (req, res) => {
    res.send('hello world');
})
app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        app.listen(port, ()=> {
            console.log("Connected to database and listening on port ", port);
        });
    })
    .catch((err)=>{
        console.log("process.env.MONG_URI = " + process.env.MONG_URI)


        console.log(err);
        
    });

module.exports = app;