const express = require('express')
const requireAuth = require('../middleware/require-auth.js')
const GardenService = require('./garden-service')
const fetch = require('node-fetch')
const config = require('../config')

const jsonBodyParser = express.json()
const GardenRouter = express.Router()

GardenRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {

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
        const { trefle_id, scientific_name, common_name, image } = req.body
        const user_id = req.user.id

        for (const value of ['trefle_id', 'scientific_name']) {
            if (!req.body[value]) {
                return res.status(400).json({ error: `Missing required field: ${value}` })
            }
        }

        GardenService.getPlantByTrefleId(
            req.app.get('db'),
            trefle_id
        )
            .then(dbPlant => {
                if (!dbPlant) {
                    if (!image) {
                        console.log('oh no, no image!')

                        return fetch(`https://trefle.io/api/plants/${trefle_id}?token=${config.TREFLE_API_KEY}`)
                            .then(trefleRes =>
                                (!trefleRes.ok)
                                    ? trefleRes.json().then(e => Promise.reject(e))
                                    : trefleRes.json()
                            )
                            .then(trefleResData => {
                                console.log(trefleResData)
                                let trefleImage = ''
                                if (trefleResData.images[0]) {
                                    trefleImage = trefleResData.images[0].url
                                }
                                console.log(trefleImage)
                                const newPlant = { 
                                    trefle_id,
                                    scientific_name, 
                                    common_name, 
                                    image: trefleImage,
                                }
                                console.log(newPlant)

                                return GardenService.insertPlant(
                                    req.app.get('db'),
                                    newPlant
                                )
                                .then(dbRes => {
                                    const newPlantInstance = {
                                        user_id,
                                        trefle_id,
                                    }
        
                                    return GardenService.insertPlantInstance(// use GardenService to insert the new plant instance
                                        req.app.get('db'),
                                        newPlantInstance
                                    )
                                        .then(plantInstance => {
                                            return res.status(201).json(`Created plant ${plantInstance.trefle_id} at user ${plantInstance.user_id}`)
                                        })
                                })


                            })
                            .catch(next)
                    } else {

                        const newPlant = { trefle_id, scientific_name, common_name, image }
    
                        return GardenService.insertPlant(
                            req.app.get('db'),
                            newPlant
                        )
                            .then(dbRes => {
                                const newPlantInstance = {
                                    user_id,
                                    trefle_id,
                                }
    
                                return GardenService.insertPlantInstance(// use GardenService to insert the new plant instance
                                    req.app.get('db'),
                                    newPlantInstance
                                )
                                    .then(plantInstance => {
                                        return res.status(201).json(`Created plant ${plantInstance.trefle_id} at user ${plantInstance.user_id}`)
                                    })
                            })
                    }
                }
            })
            .catch(next)
    })

GardenRouter
    .route('/:plant_id')
    .patch(requireAuth, (req, res, next) => {

    })
    .delete(requireAuth, (req, res, next) => {
        const { plant_id } = req.params

        GardenService.deletePlant(
            req.app.get('db'),
            plant_id
        )
            .then(() => res.status(204).end())
            .catch(next)
    })

module.exports = GardenRouter