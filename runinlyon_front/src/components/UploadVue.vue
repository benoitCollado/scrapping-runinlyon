<script setup lang="ts">
  import csv from "../csv-sync.js";
  interface InputFileEventTarget extends EventTarget{
    files: [File];
  }
  let file : File;
  const fileReader = new FileReader();
  let data : string;
  let ready = false;
 function onChangeInput(e: Event){
    const target = e.target as InputFileEventTarget;
   file = target.files[0];
   fileReader.readAsText(file,'latin1');
 }
  fileReader.onloadend = () => {
     let result = fileReader.result as string;
     /*for(let i = 0; i < result.length; i++){
       if(result[i] === 'é' || result[i] === 'è' || result[i] === 'ê'){
         result[i] = 'e';
       }
       if(result[i] === 'à' || result[i] === 'â'){
         result[i] = 'a';
       }
       if(result[i] === 'ù'){
         result[i] = 'u';
       }
       if(result[i] === 'ç'){
         result[i] = 'c';
       }
       if(result[i] === 'ï' || result[i] === 'î'){
         result[i] = 'i';
       }*/
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
      ready = true;
      console.log(csv.get_headers(data,";"));
       console.log(data);
      console.log(ready)
   }
</script>

<template>
  <form>
    <label for="file">File</label>
    <input @input="onChangeInput" type="file" id="file" name="file" />
    <button type="button" id="button">Upload</button>
  </form>
</template>