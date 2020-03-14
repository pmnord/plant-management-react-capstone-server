module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.NODE_ENV === 'development'
        ? `http://localhost:3000`
        : `https://fancy-plants-kw6d77yc8.now.sh`,
    TREFLE_API_BASE_URL: `https://trefle.io/api/`,
    
    JWT_SECRET: process.env.JWT_SECRET,
    TREFLE_API_KEY: process.env.TREFLE_API_KEY
}