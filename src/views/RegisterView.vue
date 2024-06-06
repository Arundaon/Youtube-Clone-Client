<script setup>
import { ref } from 'vue';
import NavHomeOnly from '@/components/NavHomeOnly.vue'
import {useRouter} from 'vue-router';

const router = useRouter();
const name = ref('');
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const showErrorPopup = ref(false);
const showSuccessPopup = ref(false);

const handleSubmit = async () => {
  const userData = {
    name: name.value,
    username: username.value,
    password: password.value,
  };

  fetch("http://localhost:8080/api/users",{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
      body:JSON.stringify(userData)

    },
  ).then(res=>{
    if(!res.ok){
      throw new Error(res.statusText);
    }
    else{
      showSuccessPopup.value = true;
    }

  })
    .catch(err=> {
      errorMessage.value = err;
      showErrorPopup.value = true;
    })

  name.value = '';
  username.value = '';
  password.value = '';
};

const redirectLogin = ()=>{
  router.push("/login");
}

const closeErrorPopup = ()=>{
  showErrorPopup.value = false;
}
</script>

<template>
  <NavHomeOnly/>
  <div class="register-form">

    <form @submit.prevent="handleSubmit">
      <h2>Register</h2>
      <br>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>

    <div v-if="showSuccessPopup" class="popup">
      <p>Register successful!</p>
      <br>
      <button @click="redirectLogin">Go to Login</button>
    </div>

    <div v-if="showErrorPopup" class="popup">
      <p>Register failed: {{ errorMessage }}</p>
      <br>
      <button @click="closeErrorPopup">Close</button>
    </div>
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
.register-form {
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