const TestHelpers = {
    makeTestUsers() {
        return [
            {
                id: 1,
                username: 'test-user-1',
                email: 'test-user-1-email',
                password: '$2b$12$rdjJQgxXDqMd2MIsBkJ1GOTBlrKwtCeOpFGNJlmBKL5tXefhFTRDy',
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
}

module.exports = TestHelpers