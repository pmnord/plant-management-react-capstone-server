const AuthService = require('../auth/auth-service')

const requireAuth = (req, res, next) => {
    
    const authHeader = req.get('Authorization') || ''

    if (!authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(400).json({ error: `Invalid bearer token` })
    }

    const authToken = authHeader.slice(7, authHeader.length)


    AuthService.verifyJwt(authToken)
    

}

module.exports = requireAuth;