<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import NavHomeOnly from '@/components/NavHomeOnly.vue'
import { getAuthCookie } from '@/utils/Utils'
const router = useRouter();

const video = ref(null);
const title = ref('');
const description = ref('');

const errorMessage = ref('');
const showErrorPopup = ref(false);
const showSuccessPopup = ref(false);
const loading = ref(false);


const handleSubmit = () => {
  const formData = new FormData();
  formData.append("video",video.value);
  formData.append("title",title.value);
  formData.append("description",description.value);
  loading.value = true;
  fetch("http://localhost:8080/api/videos",{
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
  video.value = null;
  title.value = "";
  description.value = "";
}

const closeErrorPopup = ()=>{
  showErrorPopup.value = false;
}

const videoUpload = (event)=>{
  video.value = event.target.files[0];
}
</script>

<template>
  <NavHomeOnly/>
  <div class="upload-form">

    <form @submit.prevent="handleSubmit">
      <h2>Upload Video</h2>
      <br>
      <div class="form-group">
        <label for="video">Video File</label>
        <input type="file" name="video" id="video" accept="video/*"  @change="videoUpload" required />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" required />
      </div>
      <button type="submit">Upload</button>
      <div v-if="loading">
        uploading...
      </div>
    </form>
  </div>

  <div v-if="showSuccessPopup" class="popup">
    <p>Video uploaded!</p>
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