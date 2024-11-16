<script setup lang="ts">
  import csv from "../csv-sync.js";
  import {ref} from 'vue';
  const headersCSV = ref<string[]>([]);
  const headers = ["nom", "prenom", "catégorie", "dossard"];
  const association: {[key:string]:string} = {nom: "", prenom: "", catégorie: "", dossard: ""};
  let fileName : string = "";
  let fileType : string = "";
  interface InputFileEventTarget extends EventTarget{
    files: [File];
    value: string|null;
  }
  let file : File;
  const fileReader = new FileReader();
  let data : string;
  let ready = false;
function onChangeInput(e: Event){
    const target = e.target as InputFileEventTarget;
   file = target.files[0];
  console.log("ici");
   fileName = file.name;
   fileType = file.type;
  console.log("name : ", fileName);
  console.log("type : ", fileType);
  if(fileType.includes("csv")){
   fileReader.readAsText(file,'latin1');
  }else{
    target.value = "";
    for(let value of Object.values(association)){
      if(value !== ""){
        value = "";
      }
    }
    ready = false;
  }

 }
  fileReader.onloadend = () => {
     let result = fileReader.result as string;
    result = result.replace(/é/g, 'e');
    result = result.replace(/è/g, 'e');
    result = result.replace(/ê/g, 'e');
    result = result.replace(/à/g, 'a');
    result = result.replace(/â/g, 'a');
    result = result.replace(/ù/g, 'u');
    result = result.replace(/ç/g, 'c');
    result = result.replace(/ï/g, 'i');
    result = result.replace(/î/g, 'i');
    result = result.replace(/ô/g, 'o');
    data = result;
    headersCSV.value = csv.get_headers(data, ";");
    //console.log(data);
    //console.log(ready)
   }
  console.log(association);
  console.log(ready);

  const selectOnChangeHandler = (e: Event) => {
    console.log("ici");
    const target = e.target as HTMLSelectElement;
    association[target.name] = target.value;
    let allHeaders = true;
    for(const value of Object.values(association)){
      if(value === ""){
        allHeaders = false;
      }
    }
    if(allHeaders){
      ready = true;
    }else{
      ready = false;
    }
  }
 const onSubmit = async (e: Event) =>{
    e.preventDefault();
    console.log(fileName);
    console.log(fileType);
    if(ready){
      const body = { name : fileName, type : fileType};
      const response = await fetch('https://scrapping-runinlyon-colladobenoit.replit.app/upload/metadata',
       {
         method: "POST",
         headers: {
           "Credentiales": "include",
           "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
       }
     );
      const data = await response.json();
      console.log(data);
    }
  }
  
</script>

<template>
  <form>
    <label for="file">File</label>
    <input @input="onChangeInput" type="file" id="file" name="file" />
    <button @click="(e)=>onSubmit(e)" type="button" id="button">Upload</button>
  </form>
  <div v-if="headersCSV.length > 0">
    <form>
      <div>
        <div>{{headersCSV}}</div>
        <div v-for="header in headers">
          <label :for="header">{{header}} :</label>
          <select  :name="header" :id="header" @change="selectOnChangeHandler($event)">
            <option value="">choose a headers please</option>
            <option v-for="csvh in headersCSV" :value="csvh" >{{csvh}}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>