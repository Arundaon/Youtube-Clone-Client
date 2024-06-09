<script setup>
import { ref, watch, inject} from 'vue';
import NavHomeOnly from '@/components/NavHomeOnly.vue'
import {useRouter} from 'vue-router';
import {setCurrentUser} from '@/utils/Utils'

const router = useRouter();

const user = inject("user")
const name = ref('');
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const showErrorPopup = ref(false);
const showSuccessPopup = ref(false);
const loading = ref(false);

const handleLogin = () => {
  const userData = {
    username: username.value,
    password: password.value,
  };
  loading.value = true;
  fetch("http://localhost:8080/api/auth/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(userData)

    },
  ).then(async rawRes=>{
    const res = await rawRes.json();
    if(!rawRes.ok){
      throw new Error(res.errors);
    }
    document.cookie="Authorization="+res.data.token+";expires="+res.data.expiredAt;

    setCurrentUser(user);
    showSuccessPopup.value=true;
    })
    .catch(err=> {
      errorMessage.value = err;
      showErrorPopup.value = true;
    })

    .finally(()=>{
      loading.value = false;
    })


};

const redirectHome = ()=>{
  setTimeout(()=>{
    router.push("/");
  },1000)

}

const closeErrorPopup = ()=>{
  showErrorPopup.value = false;
  username.value = '';
  password.value = '';
}

watch(showSuccessPopup, redirectHome)
</script>

<template>
  <NavHomeOnly/>
  <div class="login-form">

    <form @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <br>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button @click="handleLogin" type="submit">Login</button>
      <div v-if="loading">
        logging in...
      </div>
      <RouterLink to="/register">
      <h4>Create an Account</h4>
      </RouterLink>
    </form>
  </div>

  <div v-if="showSuccessPopup" class="popup">
    <p>Login successful!</p>
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
h4{
  margin: 0.5rem;
}
.login-form {
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