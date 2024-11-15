//import fs from "fs";
//import { Client } from '@replit/object-storage';
//const client = new Client();
function parse_csv_to_array(file : string ,options : {delimiter: string, headers?: boolean} ){
  let delimiter = ",";
  let have_headers = true;
  let new_array = [];
  if(options.delimiter){
    delimiter = options.delimiter;
  }
  if(options.headers){
    have_headers = options.headers;
  }
 // let number_column = determine_number_columns(delimiter, file)
  if(have_headers){
    const headers = get_headers(file, delimiter)
    new_array = get_array_from_csv_with_headers(file, headers, delimiter);
  }else{
    new_array = get_array_from_csv_without_headers(file, delimiter);
  }

  return new_array;
}

function determine_number_columns(delimiter : string, file: string){
  let number_column = 1;
  let i = 0;
  for(let char of file){
    //console.log(char);
    if(char ==="\n"|| char === "\r"){
      break;
    }
    if(char===delimiter){
      ++number_column;
    }
    ++i;
  }
  console.log(number_column);
  return number_column;
}
function get_headers(file : string, delimiter : string){
  let headers: string[] = [];
  let current_header = "";
  for(let char of file){
    if(char === "\r"){
      headers.push(current_header);
      break;
    }else if(char === delimiter){
      headers.push(current_header);
      current_header = "";
    }else{
      current_header += char;
    }
  }

  return headers;
}

function get_array_from_csv_with_headers(file: string, headers: string[], delimiter:string){
  let new_array: {[key:string]:any}[] = [];
  let current_line = 0;
  let current_data : {[key:string]:any} = {}
  let current_column = 0
  let current_value = "";
  for(let char of file){
    if(current_line === 0){
      if(char === "\n"){
        ++current_line;
        continue;
      };
    }else{
      if(char === "\r" || char === "\n"){
        if(char !=="\n"){
          current_data[headers[current_column]] = current_value;
  
          new_array.push(current_data);
          current_data = {};
          current_column = 0;
          current_line++;
          current_value = "";
        }
      } else if(char === delimiter){
        current_data[headers[current_column]] = current_value;
        current_column++;
        current_value = "";
      }else{
          current_value += char;
      }
    }
  }

  return new_array;
}
function get_array_from_csv_without_headers(file: string, delimiter:string){
  let new_array: {[key:string]:string}[] = [];
  let current_line = 0;
  let current_data: {[key:number]:string} = {}
  let current_column = 0
  let current_value = "";
  for(let char of file){

      if(char === "\r"){
        current_value.replace("é","e");
        current_data[current_column] = current_value;
        new_array.push(current_data);
        current_data = {};
        current_column = 0;
        current_line++;
        current_value = "";
      }else if(char === delimiter){
        current_value.replace("é","e");
        current_data[current_column] = current_value;
        current_column++;
        current_value = "";
      }else{
        if(char !== "\n"){
            current_value += char;
        }
      }

  }

  return new_array;
}

function get_headers_from_json(json:{[key:string]:any}){
  return Object.keys(json[0]);
}

function json_to_csv(json:{[key:string]:any}){
  const values = Object.values(json);
  const text = values.join(";");
  return text + "\r";
}
function json_keys_to_csv_headers(json:{[key:string]:any}){
  const values = get_headers_from_json(json);
  const text = values.join(";");
  return text + "\r";
}

const object = {
  parse_csv_to_array: parse_csv_to_array,
  determine_number_columns: determine_number_columns,
  get_headers: get_headers,
  get_array_from_csv_with_headers: get_array_from_csv_with_headers,
  get_array_from_csv_without_headers: get_array_from_csv_without_headers, 
  get_headers_from_json: get_headers_from_json,
  json_to_csv: json_to_csv,
  json_keys_to_csv_headers: json_keys_to_csv_headers
};




export default object;