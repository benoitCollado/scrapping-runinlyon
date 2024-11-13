import {FileDB, UserDB, SessionDB} from "./models/initDB.js";
import db from "./seque.js"

/*
db.getQueryInterface().showAllSchemas().then((tableObj) => {
    console.log('// Tables in database','==========================');
    console.log(tableObj);
})*/
try{
await FileDB.truncate();
}catch(err){
  console.log("erreur" + err);
}
//await db.drop();
/*
let files = await FileDB.findAll();
console.log(files);
await FileDB.truncate();
let users = await UserDB.findAll();
console.log(users);
*/
//await UserDB.truncate();
