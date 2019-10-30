const Sequelize = require('sequelize');


const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres';


const db = new Sequelize(databaseUrl)

db
  //.sync({ force: true })
  .sync()
  .then(() => console.log('Database schema updated'))
  .catch(console.error)

module.exports = db