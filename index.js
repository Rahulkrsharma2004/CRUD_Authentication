const express = require('express');
const {UserModel} = require("./Models/model")
const {userRouter} = require('./Router/router');
const dotenv = require("dotenv").config()
const {auth} = require("./Middleware/middleware")
const {connection} = require("./db")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/users", userRouter)

app.get("/", (req, res) => {
    res.send("Welcome to Home page")
})

app.get("/todos",auth,async(req, res) => {
    const data = await UserModel.find()
    res.status(200).json(data)

})

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Express server running on port ${PORT} and db is also connected`)

    } catch (error) {
        console.log(error)
    }

})
