import {Client} from '@replit/object-storage'
import csv from "./csv-sync.js";
import fs from "fs/promises";

const client = new Client();
/*async function importFile(){
  const file = await fs.readFile("files/benoit-1730892111771-list_dossard.csv", 'utf8');
  return file;
}*/

//const {ok, error} = await client.uploadFromText('new.csv', await importFile())
//const data = csv.parse_csv_to_array(await importFile(), {delimiter:';'});
//console.log(data);
client.list().then((data)=>console.log(data));
const {ok, value: textvalue, error} = await client.downloadAsText('new.csv');
console.log(textvalue);
