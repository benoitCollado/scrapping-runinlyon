import fs from "fs";

function parse_csv_to_array(file,options){
  let delimiter = ",";
  let have_headers = true;
  let new_array = [];
  if(options.delimiter){
    delimiter = options.delimiter;
  }
  if(options.headers){
    headers = options.headers;
  }
  let number_column = determine_number_columns(delimiter, file)
  if(have_headers){
    const headers = get_headers(file, delimiter)
    new_array = get_array_from_csv_with_headers(file, headers, delimiter);
  }else{
    new_array = get_array_from_csv_without_headers(file, number_column, delimiter);
  }

  return new_array;
}

function determine_number_columns(delimiter, file){
  let number_column = 1;
  let i = 0;
  for(let char of file){
    //console.log(char);
    if(char ==="\n"){
      break;
    }
    if(char===delimiter){
      ++number_column;
    }
    ++i;
  }
  return number_column;
}
function get_headers(file, delimiter){
  let headers = [];
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

function get_array_from_csv_with_headers(file, headers, delimiter){
  let new_array = [];
  let current_line = 0;
  let current_data = {}
  let current_column = 0
  let current_value = "";
  for(let char of file){
    if(current_line === 0){
      if(char === "\n"){
        ++current_line;
        continue;
      };
    }else{
      if(char === "\r"){
        current_data[headers[current_column]] = current_value;

        new_array.push(current_data);
        current_data = {};
        current_column = 0;
        current_line++;
        current_value = "";
      } else if(char === delimiter){
        current_data[headers[current_column]] = current_value;
        current_column++;
        current_value = "";
      }else{
        if(char !== "\n"){
          current_value += char;
        }

      }
    }
  }

  return new_array;
}
function get_array_from_csv_without_headers(file, delimiter){
  let new_array = [];
  let current_line = 0;
  let current_data = {}
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

/**
 * data must be an array
 * delimiter must be character
 */
function append_csv_line_to_file(file, data, delimiter){
  let new_data = data.join(";");
  new_data += '\r';
  fs.appendFileSync(file, new_data, (err) => {
    if (err) throw err;
  });
}

function clear_csv_file(file){
  fs.writeFileSync(file, "");
}

function get_headers_from_json(json){
  return Object.keys(json[0]);
}

const object = {
  parse_csv_to_array: parse_csv_to_array,
  determine_number_columns: determine_number_columns,
  get_headers: get_headers,
  get_array_from_csv_with_headers: get_array_from_csv_with_headers,
  get_array_from_csv_without_headers: get_array_from_csv_without_headers, 
  append_csv_line_to_file: append_csv_line_to_file,
  clear_csv_file: clear_csv_file,
  get_headers_from_json: get_headers_from_json
};


export default object;