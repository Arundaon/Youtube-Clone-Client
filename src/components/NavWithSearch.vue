<script setup>
import { ref } from 'vue'

const search = ref("")
const searchVideo = async ()=>{
  console.log("executing")
  if(search.value !== ""){
    console.log("searching..."+search.value)
  }
}
</script>

<template>
  <div class="dummy">
  </div>
  <nav>
    <RouterLink to="/"><h1>YTClone</h1></RouterLink>
    <form @submit.prevent="searchVideo" method="post" id="search-box">
      <input v-model="search" type="search" name="search" id="search" placeholder="search videos">
      <input id="submit" type="submit" value="Search">
    </form>

    <RouterLink to="/login"><div class="login-button">Login</div></RouterLink>

  </nav>
</template>

<style scoped>
.dummy{
  height: 4.5rem;
}
nav {
  position: fixed;
  top : 0;
  background-color: #202020;
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 5rem;
  align-items: center;
}
#search-box{
  display: flex;
  height: 100%;
  width: 35rem;

}
#search{
  display: block;
  width: 30rem;
  padding: 0.5rem;
}
#submit{
  width:5rem;
  //background-color: #151515;
  //color:inherit;
}

.login-button{
  background-color: #007bff;
  padding: 0.5rem;
  border-radius: 10%;
}
</style>