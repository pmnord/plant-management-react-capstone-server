module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET,

    TREFLE_API_BASE_URL: `https://trefle.io/api/`,
    TREFLE_API_KEY: process.env.TREFLE_API_KEY
}