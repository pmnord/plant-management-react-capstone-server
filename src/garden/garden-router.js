const express = require('express')
const requireAuth = require('../middleware/require-auth.js')
const GardenService = require('./garden-service')

const GardenRouter = express.Router();

GardenRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        // res.send("You passed auth and hit the garden route!")

        // console.log(req.user, req.params.user_id)

        GardenService.getUserPlants(
            req.app.get('db'),
            req.user.id
        )
        .then(plants => {
            const serializedPlants = plants.map(plant => GardenService.serializePlant(plant))
            res.status(200).json(serializedPlants)
        })
        .catch(err => console.log(err))
    })

module.exports = GardenRouter;