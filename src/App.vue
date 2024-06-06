<script setup>
import { RouterLink, RouterView } from 'vue-router'
import{onBeforeMount, provide, ref} from 'vue'
import { getAuthCookie,setCurrentUser } from '@/utils/Utils'
const user = ref(null);
provide('user', user);

onBeforeMount(()=>{
    const token = getAuthCookie();

    if(token){
      setCurrentUser(user);
    }
})
</script>

<template>
  <RouterView />
</template>

<style>
*{
  font-family: Roboto, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-color: #151515;
  font-size: 14px;
  color:#EEEEEE;
}
a{
  text-decoration: none;
  color:#EEEEEE;
}

</style>
