import sequelize from "sequelize";
import { PostgresDialect } from '@sequelize/postgres';
//import env from 'dotenv';
/*
const db = new sequelize("sqlite://runinlyon.db");

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;

import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

*/
console.log(process.env.DATABASE_URL);

const db = new sequelize(process.env.DATABASE_URL,{dialect:PostgresDialect});
try{
  await db.authenticate();
  console.log("connection established");
}catch(error){
  console.error('Unable to connect to the database:', error);
}

export default db;