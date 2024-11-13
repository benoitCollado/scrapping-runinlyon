import sequelize from "sequelize";

const db = new sequelize("sqlite://runinlyon.db");

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;