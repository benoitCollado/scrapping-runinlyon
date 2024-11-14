import csv from "../csv-sync.js";
import fs from "fs";
import {Client} from '@replit/object-storage'
const client = new Client();
process.on('message', async (m) => {
  //const file = fs.readFileSync(m.path, {encoding : 'latin1'})
  const {ok,file:textvalue,error} = await client.downloadAsText(m.path)
  const data = csv.parse_csv_to_array(textvalue,{delimiter:";"});
  process.send(data);
});
