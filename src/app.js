require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
    NODE_ENV
} = require('./config')
const errorHandler = require('./middleware/error-handler')
const usersRouter = require('./users/users-router')
const authRouter = require("./auth/auth-router");
const pancakeRouter = require('./pancake/pancake-router')

const app = express()

const morganOption = (NODE_ENV === 'production') ?
    'tiny' :
    'common';

app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use(express.static('public'))

app.use('/api/pancakes', pancakeRouter)
//Load user login router
app.use("/api/auth", authRouter);
//Load user registration router
app.use("/api/users", usersRouter);
//Load lootbox router
app.use(errorHandler)

module.exports = app
