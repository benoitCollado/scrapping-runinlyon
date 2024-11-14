import { FileDB as File, UserDB as User } from "../models/initDB.js";
import Client from '@replit/object-storage'

const client = new Client();

export async function list_files(req, res){
  try{
    const files = await File.findAll({
      where: {
        ready: true,
        username: req.decoded.user
      }
    });
    if(files){
      return res.status(200).json({message: "ok", files: files});
    }else{
      return res.status(404).json({message: "error"});
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({message: "error"});
  }
}

export async function download(req, res){
  const id = req.params.id;
  try{
    const file = await File.findOne({where:{id:id}});
    if(!file){
      return res.status(404).json({message: "error"});
    }else{
      const { ok, value: bytesValue, error } = await client.downloadAsBytes(file.dataValues.name);
      if (!ok) {
          // ... handle error ...
      }
      res.download(bytesValue, file.name);
      return res.status(200).json({message: "ok"});
    }
    
  }catch(err){
    return res.status(500).json({message: "error"});
  }
}