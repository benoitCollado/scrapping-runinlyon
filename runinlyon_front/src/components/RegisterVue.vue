<script setup lang="ts">
  import {ref, watch} from 'vue';
  import {useRouter} from 'vue-router';

  const username = ref('');
  const password = ref('');
  let available = ref('username is required');
  let ready = false; 
  const routerIntern = useRouter(); 
  async function beforeLoad(){ 
    const response = await fetch('https://scrapping-runinlyon-colladobenoit.replit.app/auth/isloged',
   {
     method: "GET",
     headers: {
       "Credentiales": "include",
       "Content-Type": "application/json",
     },
   });
 
  const data = await response.json();
    console.log(data);
    if(response.status >= 200 && response.status < 300){
    //logedIn.value = true;
    routerIntern.push({path:'/upload'});
  }
  }
  beforeLoad();
  watch(username, async(newUsername)=>{
    try{
      console.log("username value : " +newUsername);
      //const body = { username: username.value};
      const resp = await fetch('https://scrapping-runinlyon-colladobenoit.replit.app/auth/username/'+newUsername,{
        method: "GET",
        headers: {
          "Credentiales": "include",
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if(newUsername === ""){
        available.value = "username is required";
        ready = false;
      }else{
      available.value = data.message;
      ready = true;
      }
    }catch(error){
      console.log(error);
    }
  })

   async function register(e : Event){
     try{
       e.preventDefault();
       console.log("ready : " + ready);
       if(ready){
       console.log(username.value);
       console.log(password.value);
      console.log('router : ',  routerIntern);
       const body = { username: username.value, password: password.value };
       const response = await fetch('https://scrapping-runinlyon-colladobenoit.replit.app/auth/register',
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
      if(response.ok){

        routerIntern.push({path:'/login'});
      }
    }
   }catch(error){
      console.log(error);
    }
   }
  
</script>

<template>
  <input type='text' v-model='username' placeholder="nom d'utilisateur"/>
  <span>{{available}}</span>
  <input type='password' v-model='password' placeholder="mot de passe"/>
  <button @click='(e)=>{console.log("click");register(e);}'>s'inscrire</button>
  <RouterLink to="/login">se connecter</RouterLink>
  
</template>