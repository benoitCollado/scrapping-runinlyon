import db from "../seque.js";
import File from "./Files.js";
import User from "./User.js";
import Session from "./Session.js";


console.log("initDB");
User.hasMany(Session, {
  foreignKey: "username",
  onDelete: "CASCADE",
});
Session.belongsTo(User, {
  foreignKey: "username",
  onDelete: "CASCADE",
});


User.hasMany(File, {
  foreignKey: "username",
  onDelete: "CASCADE",
});
File.belongsTo(User,{
  foreignKey: "username",
  onDelete: "CASCADE",
});



(async ()=>{
  await db.sync();//{alter:true})
})();

export const UserDB = User;
export const SessionDB = Session;
export const FileDB = File;
