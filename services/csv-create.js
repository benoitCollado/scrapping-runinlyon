
import csv from "../csv-sync.js";

process.on('message',(data)=>{
  csv.clear_csv_file(data.path);
  const headers = csv.get_headers_from_json(data.data);
  csv.append_csv_line_to_file(data.path, headers);
  for(const object of data.data){
    csv.append_csv_line_to_file(data.path, Object.values(object));
  }
  process.send("ok");
});