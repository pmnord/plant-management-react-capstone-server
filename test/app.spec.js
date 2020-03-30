const app = require("../src/app.js")
const config = require('../src/config')

describe("App", () => {
    it("GET / responds with 200", () => {
        return supertest(app)
            .get('/')
            .set('api-key', config.FANCYPLANTS_API_KEY)
            .expect(200)
    })
});