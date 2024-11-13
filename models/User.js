import db from "../seque.js";
import {DataTypes} from "sequelize";

const User = await db.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });


export default User;
                       