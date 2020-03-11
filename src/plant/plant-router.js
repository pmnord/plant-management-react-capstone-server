const express = require('express')
const fetch = require('node-fetch')
const config = require('../config')

const PlantRouter = express.Router()

PlantRouter
    .route('/')
    .get((req, res, next) => {
        const query = req.query.q || ''
        if (!query) {return res.status(400).json({ error: `No search term provided` })}

        fetch(`https://trefle.io/api/plants?q=${query}&token=${config.TREFLE_API_KEY}`)
            .then(trefleRes => 
                trefleRes.ok
                    ? trefleRes.json()
                    : res.status(404).json({ error: `Failed to retrieve search results` })
            )
            .then(data => 
                (data.length > 0)
                    ? res.status(200).json(data)
                    : res.status(404).json({ error: `No results found` })
            )
    })

PlantRouter
    .route('/:trefle_id')
    .get((req, res, next) => {
        const trefle_id = req.params.trefle_id;
        console.log(trefle_id, config.TREFLE_API_KEY)

        fetch(`https://trefle.io/api/plants/${trefle_id}?token=${config.TREFLE_API_KEY}`)
            .then(trefleRes => 
                trefleRes.ok
                    ? trefleRes.json().then(data => res.status(200).json(data))
                    : res.status(404).json({ error: `Failed to retrieve that plant` })
            )
            .catch(next)
    })

module.exports = PlantRouter;