import csv from "../csv-sync.js";
import fs from "fs";
process.on('message', (m) => {
  const file = fs.readFileSync(m.path, {encoding : 'latin1'})
  const data = csv.parse_csv_to_array(file,{delimiter:";"});
  process.send(data);
});
