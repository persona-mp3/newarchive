const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer')

//create server
const app = express()
const port = 3000;
const URL = 'mongodb+srv://obscurepain:giorno@lostarchivecluster.ep0ds.mongodb.net/?retryWrites=true&w=majority&appName=lostarchivecluster';

mongoose.connect(URL)
    .then((result) => {
        console.log('Database connected');
        console.log()

        app.listen(port, ()=>{
            console.log(`Port ${port} active`)
            console.log()
            console.log(`home page: http://localhost:3000/`)
            console.log(`login page: http://localhost:3000/login`)
            console.log(`sign up page: http://localhost:3000/signup`)
        })
    })
    .catch((err) => console.log(`error`, err))
//handle form data
const homeLink = 'http://localhost:3000/'
app.use(express.static('public'));
app.use(morgan('dev'));

const miniDB = []

app.use(express.urlencoded({ extended: true}))

//ROUTING
app.get('/', (req, res) => {
    res.status(200).sendFile('/pages/index.html', {root: __dirname})
})
app.get('/signup', (req, res) => {
    res.status(200).sendFile('/pages/sign-up.html', {root: __dirname})
})

app.get('/login', (req, res) => {
    res.status(200).sendFile('/pages/login-page.html', {root: __dirname})
})



//form submission
const upload = multer()

app.post('/sign-up', upload.none(),    async (req, res) => {
    //generate salt --> selct password and hash --> combine both
    try{
        const salt = await bcrypt.genSalt();
        const hasedPassword = await bcrypt.hash(req.body.password, salt);
        const updatedUser = {email: req.body.email, password:hasedPassword};
        console.log(`Updated User Info below`)
        console.log(updatedUser)
        miniDB.push(updatedUser)
        console.log(miniDB)
        res.redirect(303, '/login');
        }catch{
            console.log(`Error`)
            res.status(500).send('Internal Server Error')
        }


})

//handle login function 
app.post('/login', upload.none(), async (req, res) =>{
    //find with username
    const user = await miniDB.find(user => user.email = req.body.email);

    if(!user){
        console.log('User not found')
        return res.status(400).send(`Email address not found`);
    }

    //use brcypt.compare to compare passwords
    try{
        const match = await bcrypt.compare(req.body.password, user.password);

        if (match){
            console.log(`Login accepted`)
            return res.redirect('/')
        } else{
                console.log('Invalid Credentials')
                return res.status(401).send('Invalid Credentials')
        }
    
    } catch{
        res.status(500).send(`Internal Server Error`)
    }
})






// 404 Handling
app.use((req, res) => {
    res.status(404).sendFile('/pages/404.html', {root: __dirname})
})

// app.listen(port, ()=>{
//     console.log(`Port ${port} active`)
//     console.log(homeLink)
// })

