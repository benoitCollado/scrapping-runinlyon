import EventEmiter from "events";
import cp from "child_process";
import {FileDB as File} from "./models/initDB.js";



const NewFile = new EventEmiter();
NewFile.on("newFile", (filePath, fileId) =>{
  //console.log("new file created -> path : " + filePath + " id : " + fileId );
  const child = cp.fork("/home/runner/scrapping-runinlyon/services/csv-parse.js");
  child.send({path: filePath});
  child.on('message', (data) =>{
   // console.log("data_received");
    NewFile.emit('csv-data', data, filePath, fileId);
  });
});

NewFile.on('csv-data', (data, path, id)=>{
  //console.log("csv_data");
  const child = cp.fork("/home/runner/scrapping-runinlyon/services/scrapping.js");
  child.send({data: data});
  child.on('message', modified =>{
    //console.log("modified");
    //console.log(modified);
    NewFile.emit("modified-data", modified, path, id);
  });
});

NewFile.on('modified-data', (modified, path, id)=>{
  console.log("path : " + path + " id : " + id);
  for(const modif of modified){
    let heures = 0;
    let minutes = 0;
    let secondes = 0;
    let totalsecondes = 0;
    if(modif.temps){
      const str_temps = modif.temps;
      console.log("str_temps : "+ str_temps)
      const times = str_temps.split(":");
      heures = parseInt(times[0]);
      minutes = parseInt(times[1]);
      secondes = parseInt(times[2]);
      totalsecondes = heures * 3600 + minutes * 60 + secondes;
      console.log(heures + "h " + minutes + "m " + secondes + "s" );
    }
    modif.heures = heures;
    modif.minutes = minutes;
    modif.secondes = secondes;
    modif.totalsecondes = totalsecondes;
  }
  const child = cp.fork("/home/runner/scrapping-runinlyon/services/csv-create.js");
  child.send({path: path, data: modified});
  child.on( 'message', message => {
    console.log("fichier modifié et prêt à être téléchargé");
    const file = File.findOne({where: {id: id}});
    file.update({ready: true});
  });
});


export default NewFile;