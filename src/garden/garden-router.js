const express = require('express')
const requireAuth = require('../middleware/require-auth.js')
const GardenService = require('./garden-service')

const jsonBodyParser = express.json();
const GardenRouter = express.Router();

GardenRouter
    .route('/')
    // .all((req, res, next) => {
    //     return req.params.user_id == req.user.id
    //         ? next()
    //         : res.status(400).json({ error: `Invalid request` })
    // })
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
        .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { trefle_id, scientific_name, common_name, image } = req.body;

        // use AuthService to get user by username
        // then set the user_id by that
        // This restricts users from adding plants to other user's collections
        const user_id = req.user.id

        for (const value of ['user_id', 'trefle_id', 'scientific_name']) {
            if (!req.body[value]) {
                return res.status(400).json({ error: `Missing required field: ${value}` })
            }
        }
        
        // When the user adds a plant to their garden, check the plants db to see if we already have it
        GardenService.getPlantByTrefleId(
            req.app.get('db'),
            trefle_id
        )
        .then(dbPlant => {

            // If we don't have the plant in our database, add it
            if (!dbPlant) {
                const newPlant = { trefle_id, scientific_name, common_name, image }
                console.log(newPlant)
                return GardenService.insertPlant(
                    req.app.get('db'),
                    newPlant
                )
                .then(plant => {
                    return res.status(201).json(`Created plant ${plant.trefle_id} in fancyplants_plants`)
                })
            }

            const newPlantInstance = { 
                user_id,
                trefle_id,
            }
            
            GardenService.insertPlantInstance(// use GardenService to insert the new plant instance
                req.app.get('db'),
                newPlantInstance
            )
            .then(plantInstance => {
                return res.status(201).json(`Created plant ${plantInstance.trefle_id} at user ${plantInstance.user_id}`)
            })
            
        })
        .catch(next)
    })
    .patch(requireAuth, (req, res, next) => {
        
    })

module.exports = GardenRouter;