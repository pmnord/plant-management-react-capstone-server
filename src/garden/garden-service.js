const xss = require('xss')

const GardenService = {
    getUserPlants(db, user_id) {
        return db
            .select('*')
            .from('fancyplants_plant_instances')
            .where({ user_id })
            .rightJoin('fancyplants_plants', 'plant_id', 'trefle_id')
    },
    serializePlant(plant) {
        return {
            scientific_name: plant.scientific_name,
            common_name: plant.common_name,
            image: plant.image,
            watered_date: plant.watered_date,
            note: xss(plant.note),
        }
    }
}

module.exports = GardenService;