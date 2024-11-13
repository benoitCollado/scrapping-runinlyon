import db from "../seque.js";

import {DataTypes} from "sequelize";

const Session = await db.define(
  'session',
  {
    sessions_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
  }
);

export default Session;

