const app = require('../src/app')
const knex = require('knex')
const TestHelpers = require('./test-helpers')

describe('Plant Endpoints', () => {
    let db;

    before('create the db instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })

        app.set('db', db)
    })

    before('clean the tables', () => TestHelpers.truncateDbTables(db))

    after('destroy the db instance', () => db.destroy())

    // afterEach('clean the tables', () => TestHelpers.truncateDbTables(db))

    describe('GET /plant?=query', () => {
        it('returns 200 and the expected array of plants', () => {
            return supertest(app)
                .get(`/api/plant?q=Prunus_tenella`)
                .expect(200, [
                    {
                        "slug": "prunus-tenella",
                        "scientific_name": "Prunus tenella",
                        "link": "http://trefle.io/api/plants/171403",
                        "id": 171403,
                        "complete_data": true,
                        "common_name": "dwarf Russian almond"
                    }
                ])
        })
    })

    describe('GET /plant/:plant_id', () => {
        it('returns 200 and the expected plant from trefle', () => {
            return supertest(app)
                .get(`/api/plant/171403`)
                .expect(200, {
                    "varieties": [],
                    "sub_species": [],
                    "scientific_name": "Prunus tenella",
                    "order": {
                        "slug": "rosales",
                        "name": "Rosales",
                        "link": "http://trefle.io/api/division_orders/10",
                        "id": 10
                    },
                    "native_status": null,
                    "main_species": {
                        "year": null,
                        "type": "species",
                        "synonym": false,
                        "status": "Unknown",
                        "specifications": {
                            "toxicity": "None",
                            "shape_and_orientation": "Erect",
                            "regrowth_rate": null,
                            "nitrogen_fixation": "None",
                            "max_height_at_base_age": {
                                "ft": 5,
                                "cm": 152.39256324291372
                            },
                            "mature_height": {
                                "ft": 5,
                                "cm": 152.39256324291372
                            },
                            "low_growing_grass": null,
                            "lifespan": "Moderate",
                            "leaf_retention": null,
                            "known_allelopath": null,
                            "growth_rate": "Moderate",
                            "growth_period": "Spring and Summer",
                            "growth_habit": null,
                            "growth_form": "Rhizomatous",
                            "fire_resistance": null,
                            "fall_conspicuous": true,
                            "coppice_potential": null,
                            "c_n_ratio": "High",
                            "bloat": "None"
                        },
                        "sources": [
                            {
                                "species_id": 171403,
                                "source_url": "https://plants.usda.gov",
                                "name": "USDA",
                                "last_update": "2019-01-11T11:28:07.920524"
                            }
                        ],
                        "soils_adaptation": {
                            "medium": true,
                            "fine": true,
                            "coarse": true
                        },
                        "slug": "prunus-tenella",
                        "seed": {
                            "vegetative_spread_rate": "Moderate",
                            "small_grain": null,
                            "seeds_per_pound": 1600,
                            "seedling_vigor": "Low",
                            "seed_spread_rate": "Slow",
                            "commercial_availability": "Routinely Available",
                            "bloom_period": "Late Spring"
                        },
                        "scientific_name": "Prunus tenella",
                        "propagation": {
                            "tubers": null,
                            "sprigs": null,
                            "sod": null,
                            "seed": true,
                            "cuttings": null,
                            "corms": null,
                            "container": true,
                            "bulbs": null,
                            "bare_root": true
                        },
                        "products": {
                            "veneer": null,
                            "pulpwood": null,
                            "protein_potential": null,
                            "post": null,
                            "palatable_human": true,
                            "palatable_graze_animal": null,
                            "palatable_browse_animal": null,
                            "nursery_stock": true,
                            "naval_store": null,
                            "lumber": null,
                            "fuelwood": null,
                            "fodder": null,
                            "christmas_tree": null,
                            "berry_nut_seed": null
                        },
                        "native_status": null,
                        "main_species_id": null,
                        "is_main_species": true,
                        "images": [
                            {
                                "url": "https://upload.wikimedia.org/wikipedia/commons/4/41/Prunus_triloba_4.jpg"
                            },
                            {
                                "url": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Prunus_tenella1.jpg"
                            },
                            {
                                "url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Aardbei-bloemcloseup.jpg"
                            }
                        ],
                        "id": 171403,
                        "growth": {
                            "temperature_minimum": {
                                "deg_f": -38,
                                "deg_c": -38.888888888888886
                            },
                            "shade_tolerance": "Intolerant",
                            "salinity_tolerance": "None",
                            "root_depth_minimum": {
                                "inches": 14,
                                "cm": 35.56007112014225
                            },
                            "resprout_ability": true,
                            "precipitation_minimum": {
                                "inches": 15,
                                "cm": 38.10007620015241
                            },
                            "precipitation_maximum": {
                                "inches": 50,
                                "cm": 127.00025400050801
                            },
                            "planting_density_minimum": {
                                "sqm": 6879662,
                                "acre": 1700
                            },
                            "planting_density_maximum": {
                                "sqm": 10926522,
                                "acre": 2700
                            },
                            "ph_minimum": 5,
                            "ph_maximum": 7.5,
                            "moisture_use": "Medium",
                            "hedge_tolerance": "Low",
                            "frost_free_days_minimum": 90,
                            "fire_tolerance": "High",
                            "fertility_requirement": "Medium",
                            "drought_tolerance": "High",
                            "cold_stratification_required": true,
                            "caco_3_tolerance": "Low",
                            "anaerobic_tolerance": "None"
                        },
                        "fruit_or_seed": {
                            "seed_persistence": null,
                            "seed_period_end": "Summer",
                            "seed_period_begin": "Summer",
                            "seed_abundance": "Medium",
                            "conspicuous": true,
                            "color": "Red"
                        },
                        "foliage": {
                            "texture": "Coarse",
                            "porosity_winter": "Moderate",
                            "porosity_summer": "Dense",
                            "color": "Green"
                        },
                        "flower": {
                            "conspicuous": true,
                            "color": "White"
                        },
                        "family_common_name": "Rose family",
                        "duration": null,
                        "complete_data": true,
                        "common_name": "dwarf Russian almond",
                        "bibliography": null,
                        "author": null
                    },
                    "images": [
                        {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/4/41/Prunus_triloba_4.jpg"
                        },
                        {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Prunus_tenella1.jpg"
                        },
                        {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Aardbei-bloemcloseup.jpg"
                        }
                    ],
                    "id": 171403,
                    "hybrids": [],
                    "genus": {
                        "slug": "prunus",
                        "name": "Prunus",
                        "link": "http://trefle.io/api/genuses/5629",
                        "id": 5629
                    },
                    "forms": [],
                    "family_common_name": "Rose family",
                    "family": {
                        "slug": "rosaceae",
                        "name": "Rosaceae",
                        "link": "http://trefle.io/api/families/11",
                        "id": 11,
                        "common_name": "Rose family"
                    },
                    "duration": null,
                    "division": {
                        "slug": "magnoliophyta",
                        "name": "Magnoliophyta",
                        "link": "http://trefle.io/api/divisions/1",
                        "id": 1
                    },
                    "cultivars": [],
                    "common_name": "dwarf Russian almond",
                    "class": {
                        "slug": "magnoliopsida",
                        "name": "Magnoliopsida",
                        "link": "http://trefle.io/api/division_classes/1",
                        "id": 1
                    }
                })
        })
    })

})