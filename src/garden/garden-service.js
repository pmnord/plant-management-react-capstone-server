const xss = require('xss')

const GardenService = {
    getUserPlants(db, user_id) {
        return db
            .select('*')
            .from('fancyplants_plant_instances')
            .where({ user_id })
            .rightJoin('fancyplants_plants', 'fancyplants_plants.trefle_id', 'fancyplants_plant_instances.trefle_id')
            // You can't have the same name for both columns when doing a join due to ambiguity
    },
    serializePlant(plant) {
        return {
            scientific_name: plant.scientific_name,
            common_name: plant.common_name,
            image: plant.image,
            watered_date: plant.watered_date,
            trefle_id: plant.trefle_id,
            note: xss(plant.note),
        }
    },
    getPlantByTrefleId(db, trefle_id) {
        return db
            .from('fancyplants_plants')
            .where({ trefle_id })
            .first()
    },
    insertPlant(db, plant) {
        return db
            .into('fancyplants_plants')
            .insert(plant)
            .returning('*')
            .then(rows => {
                return rows[0];
            })
    },
    insertPlantInstance(db, plantInstance) {
        return db
            .into('fancyplants_plant_instances')
            .insert(plantInstance)
            .returning('*')
            .then(rows => {
                return rows[0];
            })
    }
}

module.exports = GardenService;