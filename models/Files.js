import db from "../seque.js";
import {DataTypes} from "sequelize";

const File = await db.define(
  "file",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    downloaded : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    path:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ready:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });


export default File;