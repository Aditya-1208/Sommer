const mongoose = require('mongoose')
const app = require(`${__dirname}/../app.js`);
exports.connectDb = async () => {
    const connectionURL = process.env.DB_CONNECTION
    try {
        const connection = await mongoose.connect(connectionURL);
        console.log('Database connected successsfully');

    } catch (error) {
        console.log(error);
    }
}

exports.runServer = async () => {
    try {

        const port = process.env.PORT || 3000;
        await app.listen(port)
        console.log(`Server Listening on port ${port}`);
    } catch (error) {
        console.log(error);
    }
}

exports.seedModel = async (model, data) => {
    try {
        await exports.connectDb();
        await model.deleteMany({});
        await model.create(data);
        mongoose.connection.close();
        console.log('Data seeded successfully');
    } catch (error) {
        console.log(error);
    }
}