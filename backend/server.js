const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  

// Routes
app.use('/api', userRoutes);  

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something went wrong!');
  });
   
// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
