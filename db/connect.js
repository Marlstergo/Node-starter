const mongoose = require("mongoose")

const connectDB = (connectionString) => {
    return mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
}

module.exports = connectDB
