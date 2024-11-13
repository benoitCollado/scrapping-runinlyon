<script setup lang="ts">
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';


  const username = ref('');
  const password = ref('');
  const routerIntern = useRouter(); 
   async function login(e : Event){
     try{
       e.preventDefault();
       console.log(username.value);
       console.log(password.value);
      console.log('router : ',  routerIntern);
       const body = { username: username.value, password: password.value };
       const response = await fetch('https://scrapping-runinlyon-colladobenoit.replit.app/auth/login',
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
       
        routerIntern.push({path:'/upload'});
      }else{
        console.log("mauvais login ou mot de passe");
      }
   }catch(error){
      console.log(error);
    }
   }
  

</script>

<template>
  <input type='text' v-model='username' placeholder="nom d'utilisateur"/>
  <input type='password' v-model='password' placeholder="mot de passe"/>
  <button @click='(e)=>{login(e)}'>login</button>
  <RouterLink to="/register">s'incrire</RouterLink>
</template>