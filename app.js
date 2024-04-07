require("dotenv").config()

const express = require("express")
const connectDB = require("./db/connect")
const tasks = require("./routes/tasks")
const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/errorHandler")

const app = express()

// middleware
app.use(express.json())
app.use(express.static("./public"))

app.use("/api/v1/tasks", tasks)
app.use("*", notFound)
app.use(errorHandler)

const port = process.env.PORT

const start = async () => {
    try {
        console.log("connecting db")
        await connectDB(process.env.CONNECTION_STRING)
        app.listen(port, () => {
            console.log(`Database connected`)
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
