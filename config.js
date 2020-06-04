module.exports = {
    port: process.env.PORT || 3003,
    db: process.env.MONGODB || 'mongodb://localhost:27017/test',
    SECRET_TOKEN: '12345',
    password: 'admin1234'
}