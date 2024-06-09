<script setup>
import { ref, inject} from 'vue'
import {useRouter} from 'vue-router'
import { getAuthCookie } from '@/utils/Utils'

const user = inject('user');
const router = useRouter();
const search = ref("");
const searchVideo = async ()=>{
  if(search.value !== ""){
    router.push({name:'home', query : {search: search.value} })
  }
}

const logout = ()=>{
  const token = getAuthCookie();
  if(token && user){
    fetch("http://localhost:8080/api/auth/logout",{
      method:"DELETE",
      headers:{
        'X-API-TOKEN':token
      }
    })
      .then(async rawRes =>{
        const res = await rawRes.json();
        if(!rawRes.ok){
          throw new Error(res.errors)
        }
        document.cookie = 'Authorization=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;';
        user.value = null;
      })
      .catch(err=>{
        console.log("can't remove cookie")
      })
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

    <RouterLink v-if="(user == null)" to="/login"><button class="login">Login</button></RouterLink>
    <div class="profile-logout" v-else>
      <RouterLink to="/upload"><a class="upload"><img src="@/assets/upload.png" alt="upload" ></a></RouterLink>
      <a href="/update-user">
      <img  alt="profile" class="profile" :src="`http://localhost:8080/contents/${user.profile}`" v-if="user.profile != null">
      <img  alt="profile" class="profile" src="../assets/default_profile.svg" v-else>
      </a>
      <button class="logout" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
.dummy{
  height: 4.5rem;
}

nav {
  z-index: 10;
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
}
.profile-logout{
  width: 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.upload img{
  width: 3rem;
  filter: invert();
}

button{
  font-weight: bold;
  font-size: 14px;
  height: 100%;
}

.login{
  background-color: #007bff;
}

.logout{
  background-color: #b30505;
}
</style>