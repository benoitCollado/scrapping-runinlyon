<script setup lang='ts'>
  import {useRouter} from 'vue-router';
  //import {ref} from 'vue';

  //const logedIn = ref(false);
  

  /*watch(router, async ()=>{
    await beforeLoad()
  });*/
  
async function beforeLoad(){ 
  const router = useRouter();
  const response = await fetch('https://scrapping-runinlyon-colladobenoit.replit.app/auth/isloged',
 {
   method: "GET",
   headers: {
     "Credentiales": "include",
     "Content-Type": "application/json",
   },
 });
console.log(router);
const data = await response.json();
  console.log(data);
  if(response.status >= 200 && response.status < 300){
  //logedIn.value = true;
  router.push({path:'/upload'});
}else{
  router.push({path:'/login',});
}
}
  beforeLoad();
</script>


<template>
  <div id="app">
     <h1>RUNIN SEARCH RESULT</h1>
    <nav>
      <!--<RouterLink to="/register>">s'incrire</RouterLink>-->
      <RouterLink to="/login">se connecter</RouterLink>
      
      <!--<RouterLink to="/upload">teléchargement(upload)</RouterLink>
      <RouterLink to="/download">téléchargement(download)</RouterLink>-->
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

