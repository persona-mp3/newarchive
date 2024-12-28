const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer')
const bodyParser = require('body-parser')

//create server
const app = express()
const port = 3000;
//handle form data
const homeLink = 'http://localhost:3000/'
app.use(express.static('public'));
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true}))

//ROUTING
app.get('/', (req, res) => {
    res.status(200).sendFile('/pages/index.html', {root: __dirname})
})
app.get('/sign-up', (req, res) => {
    res.status(200).sendFile('/pages/sign-up.html', {root: __dirname})
})



//form submission
const upload = multer()
app.post('/', upload.none(), (req, res) => {
    console.log( `Form Received: `, req.body)
    res.status(200).json({ message: 'Form submitted succesffully'})
})


// 404 Handling
app.use((req, res) => {
    res.status(404).sendFile('/pages/404.html', {root: __dirname})
})

app.listen(port, ()=>{
    console.log(`Port ${port} active`)
})

