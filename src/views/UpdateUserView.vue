<script setup>
import { ref, inject, watch, onBeforeMount } from 'vue';
import {useRouter} from 'vue-router'
import NavHomeOnly from '@/components/NavHomeOnly.vue'
import { getAuthCookie } from '@/utils/Utils'
const router = useRouter();

const profile = ref(null);
const user = inject('user')
const name = ref("");
const bio = ref("");
const password = ref('');
const repeatPassword = ref('');

watch(user,()=>{
  name.value=user.value.name;
  if(user.value.bio !=null){
    bio.value = user.value.bio;
  }
})

const errorMessage = ref('');
const showErrorPopup = ref(false);
const showSuccessPopup = ref(false);
const loading = ref(false);


const handleSubmit = () => {
  if(name.value < 3 ){
    errorMessage.value = "Name must be at least 3 characters in length";
    showErrorPopup.value = true;
    return;
  }
  if(password.value !== repeatPassword.value){
    errorMessage.value = "Password repeated must have the same value";
    showErrorPopup.value = true;
    return;
  }
  const formData = new FormData();
  if(profile.value != null){
    formData.append("profile",profile.value);
  }

  formData.append("name",name.value);

  if(bio.value !== null){
    formData.append("bio",bio.value);
  }
  if(password.value !== ""){
    if(password.value < 8 ){
      errorMessage.value = "Password must be at least 8 characters in length";
      showErrorPopup.value = true;
      return;
    }
    formData.append("password",password.value);
  }

  loading.value = true;
  fetch("http://localhost:8080/api/users/current",{
    method:"POST",
    headers:{
      'X-API-TOKEN':getAuthCookie()
    },
    body:formData
  })
    .then(async rawRes  => {
      const res = await rawRes.json();
      if(!rawRes.ok){
        throw new Error(res.errors)
      }
      showSuccessPopup.value = true;
    })
    .catch(err=>{
      errorMessage.value = err;
      showErrorPopup.value = true;
    })
    .finally(()=>{
      loading.value = false;
    })

};


const closeSuccessPopup = ()=>{
  showSuccessPopup.value = false;
  profile.value = null;
}

const closeErrorPopup = ()=>{
  showErrorPopup.value = false;
}

const profileUpload = (event)=>{
  profile.value = event.target.files[0];
}

</script>

<template>
  <NavHomeOnly/>
  <div class="upload-form">

    <form @submit.prevent="handleSubmit">
      <h2>Update User Information</h2>
      <br>
      <div class="form-group">
        <label for="profile">Profile Image</label>
        <input type="file" name="profile" id="profile" accept="image/*"  @change="profileUpload">
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name"  required />
      </div>
      <div class="form-group">
        <label for="bio">Bio</label>
        <input type="text" id="bio" v-model="bio" >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" >
      </div>
      <div class="form-group">
        <label for="repeat-password">Repeat Password</label>
        <input type="password" id="repeat-password" v-model="repeatPassword" >
      </div>
      <button type="submit">Upload</button>
      <div v-if="loading">
        updating...
      </div>
    </form>
  </div>

  <div v-if="showSuccessPopup" class="popup">
    <p>User updated!</p>
    <button @click="closeSuccessPopup">Close</button>
  </div>

  <div v-if="showErrorPopup" class="popup">
    <p>{{ errorMessage }}</p>
    <br>
    <button @click="closeErrorPopup">Close</button>
  </div>
</template>



<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #303030;
  border-radius: 1rem;
}
h2{
  align-self: center;
}
.upload-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: auto;

  height: 90vh;
}

form{

  background-color: #222222;
  padding: 1rem;
  border-radius: 3%;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>