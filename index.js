const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const authMiddleware = require('./middleware/auth');
const lpRoutes = require('./routes/lp');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/lp', lpRoutes);

const server = () => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
};


server();
