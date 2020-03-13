const TestHelpers = {
    makeTestUsers() {
        return [
            {
                id: 1,
                username: 'test-user-1',
                email: 'test-user-1-email',
                password: '$2b$12$rdjJQgxXDqMd2MIsBkJ1GOTBlrKwtCeOpFGNJlmBKL5tXefhFTRDy', // "password"
                date_created: new Date('2029-01-22T16:28:32.615Z')
            },
            {
                id: 2,
                username: 'test-user-2',
                email: 'test-user-2-email',
                password: '$2b$12$rdjJQgxXDqMd2MIsBkJ1GOTBlrKwtCeOpFGNJlmBKL5tXefhFTRDy',
                date_created: new Date('2029-02-22T16:28:32.615Z')
            },
            {
                id: 3,
                username: 'test-user-3',
                email: 'test-user-3-email',
                password: '$2b$12$rdjJQgxXDqMd2MIsBkJ1GOTBlrKwtCeOpFGNJlmBKL5tXefhFTRDy',
                date_created: new Date('2029-03-22T16:28:32.615Z')
            },
        ]
    },
    truncateDbTables(db) {
        return db.transaction(trx =>
            trx.raw(
                `TRUNCATE
                  fancyplants_plant_instances,
                  fancyplants_plants,
                  fancyplants_users
                `
            )
                .then(() =>
                    Promise.all([
                        trx.raw(`ALTER SEQUENCE fancyplants_plant_instances_id_seq minvalue 0 START WITH 1`),
                        trx.raw(`ALTER SEQUENCE fancyplants_plants_id_seq minvalue 0 START WITH 1`),
                        trx.raw(`ALTER SEQUENCE fancyplants_users_id_seq minvalue 0 START WITH 1`),
                        trx.raw(`SELECT setval('fancyplants_plant_instances_id_seq', 0)`),
                        trx.raw(`SELECT setval('fancyplants_plants_id_seq', 0)`),
                        trx.raw(`SELECT setval('fancyplants_users_id_seq', 0)`),
                    ])
                )
        )
    },
    seedDbTables(db, users, plants, plantInstances) {
        return db.transaction(async trx => {
            await trx.into('fancyplants_users').insert(users)
            await trx.raw(
                `SELECT setval('fancyplants_users_id_seq', ?)`,
                [users[users.length - 1].id]
            )

            await trx.into('fancyplants_plants').insert(plants)
            await trx.raw(
                `SELECT setval('fancyplants_plants_id_seq', ?)`,
                [plants[plants.length - 1].id]
            )

            await trx.into('fancyplants_plant_instances').insert(plantInstances)
            await trx.raw(
                `SELECT setval('fancyplants_plant_instances_id_seq', ?)`,
                [plantInstances[plantInstances.length - 1].id]
            )
        })
    }
}

module.exports = TestHelpers