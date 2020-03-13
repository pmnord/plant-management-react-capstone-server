require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');

const app = express();
const authRouter = require('./auth/auth-router.js')
const userRouter = require('./user/user-router')
const gardenRouter = require('./garden/garden-router')
const plantRouter = require('./plant/plant-router')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/garden', gardenRouter)
app.use('/api/plant', plantRouter)

app.use(function errorHandler(error, req, res, next) {
      let response;
      if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
      } else {
        console.error(error)
        response = { message: error.message, error }
      }
      res.status(500).json(response)
    })


module.exports = app