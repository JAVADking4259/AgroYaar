const express = require("express");
const env = require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dataBase = require('./utills/initializer');
const routes = require('./routes/routes');


app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(cors());


// database connection
dataBase;
// routes
app.use('/api',routes);

if (env.error) {
    throw dotenv.error;
}

const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log(`server running on port ${port}`);
    
});