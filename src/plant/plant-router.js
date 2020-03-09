const express = require('express')

const PlantRouter = express.Router();

PlantRouter
    .route('/plant')
    .get((req, res, next) => {
        // First check the database with the service object
        // Then fetch from Trefle with the node-fetch api
    })