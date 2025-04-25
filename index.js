const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const authMiddleware = require('./middleware/auth');
const lpRoutes = require('./routes/lp');

const PORT = process.env.PORT || 4000;  

app.use(bodyParser.json());
app.use('/api/lp', lpRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World! Server is running successfully.');
  });  

app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});
