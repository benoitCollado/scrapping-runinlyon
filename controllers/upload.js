import fs from "fs/promises";
import path from "path";
//import { fileURLToPath } from "url";
import { FileDB as File, UserDB as User } from "../models/initDB.js";
import NewFile from "../events.js";

import Client from '@replit/object-storage'

const client = new Client();

//const __filename = fileURLToPath(import.meta.url);

//const __dirname = path.dirname(__filename);
const __dirname = "/home/runner/scrapping-runinlyon/files/"
export async function upload(req, res){
  try {
    //await File.truncate();
    let id = req.params.id;
    let data = [];
    let file = await File.findOne({where: {id: id ,username: req.decoded.user}});
    console.log(file);
    console.log("pas ici");
    if(!file){
      throw new Error("file not found");
    }
    req.on("data", (chunk) => {
      data.push(chunk);
      console.log("data");
    });
    req.on("end", async () => {
      let fileData = Buffer.concat(data);
      console.log(fileData);
      const { ok, error } = await client.uploadFromBytes(file.dataValues.name, fileData);
      if(!ok){
        return res.status(500).json({error: "error"});
      }else{
        NewFile.emit("newFile", file.dataValues.path, id);
      }
      /*fs.writeFile(
        path.join(__dirname, file.dataValues.name),
        fileData,
        "base64",
        (err) => {
          if (err) {
           return res.statusCode = 500;
          }
        },
      ).then(()=>{
        NewFile.emit("newFile", file.dataValues.path, id);
      });*/
    });
    /*
    const child = cp.fork("/home/runner/scrapping-runinlyon/controllers/"+"child.js");
    child.send({path: "/home/runner/scrapping-runinlyon/files/" + req.decoded.user + "-" +file.dataValues.name, id:id});*/
    return res.status(200).json({message: "ok"});
  }catch(err){
    console.log(err);
    return res.status(500).json({error: "error"});
  }
}

export async  function upload_meta_data(req, res){
 try{
  let name = req.body.name;
  let type = req.body.type;
  let date = new Date();
  console.log(req.decoded.user);
  const file = await File.create({ name: req.decoded.user + "-"+ date.getTime() +"-" +name, type: type, path:/*"/home/runner/scrapping-runinlyon/files/" +*/ req.decoded.user + "-"+ date.getTime() +"-" +name, username: req.decoded.user})
   if(!file){
     return res.status(500).json({message: "error file not created" });
   }else{
     return res.status(200).json({message: "ok", id: file.dataValues.id});
   }
 }catch(err){
    return res.status(500).json({message: "error", error: err});
  }  
}