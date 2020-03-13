const app = require('../src/app')
const knex = require('knex')
const TestHelpers = require('./test-helpers')

xdescribe('Auth Endpoints', () => {
    const testUsers = TestHelpers.makeTestUsers()
    const testUser = testUsers[0]
    

    let db;

    before('create the db instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })

        app.set('db', db)
    })

})