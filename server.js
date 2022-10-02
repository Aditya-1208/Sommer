const mongoose = require('mongoose');
const app = require(`${__dirname}/app.js`);
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const connectionURL = `mongodb+srv://aditya:${process.env.PASSWORD}@cluster0.grdy9dc.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connectionURL).then(() => {
    console.log('Database connected successfully');
}).catch(err => console.log(err));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
})