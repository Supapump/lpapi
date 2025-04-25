const express = require ('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const authMiddleware = require('./middleware/auth')
const lpRoutes = require('./routes/lp')


const PORT = process.env.PORT


app.use(bodyParser.json());
app.use('/api/lp', lpRoutes);


const server = () => {
     app.listen (PORT, () => {
        console.log ('listening to port:', PORT)
     })
}

server()