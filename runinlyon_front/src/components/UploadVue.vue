<script setup lang="ts">
  interface InputFileEventTarget extends EventTarget{
    files: [File];
  }
  //import {ref} from 'vue';
  //import {useRouter} from 'vue-router';
  let file : File;
 function onChangeInput(e: Event){
    const target = e.target as InputFileEventTarget;
   file = target.files[0];
   console.log(file);
 }
</script>

<template>
  <form>
    <label for="file">File</label>
    <input @input="onChangeInput" type="file" id="file" name="file" />
    <button type="button" id="button">Upload</button>
  </form>
</template>