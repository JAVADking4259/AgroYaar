const mongoose = require('mongoose');


const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const server= process.env.MONGO_SERVER;
const port= process.env.MONGO_PORT;
mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@${server}:${port}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});