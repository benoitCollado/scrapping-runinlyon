
import csv from "../csv-sync.js";
import {Client} from '@replit/object-storage'
const client = new Client();
process.on('message',async (data)=>{
  /*csv.clear_csv_file(data.path);
  const headers = csv.get_headers_from_json(data.data);
  csv.append_csv_line_to_file(data.path, headers);
  for(const object of data.data){
    csv.append_csv_line_to_file(data.path, Object.values(object));
  }*/
  let csv_file = csv.json_keys_to_csv_headers(data.data[0]);
  for(const object of data.data){
    csv_file += csv.json_to_csv(object);
  }
  await client.uploadFromText(data.path, csv_file);
  
  process.send("ok");
});