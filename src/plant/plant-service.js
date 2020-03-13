
const PlantService = {
    getPlantFromDb(db, trefle_id) {
        return db
            .from('fancyplants_plants')
            .select('*')
            .where({ trefle_id })
            .first()
    },
}

module.exports = PlantService;