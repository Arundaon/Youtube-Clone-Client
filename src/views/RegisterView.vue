<script setup>
import { ref } from 'vue';
import NavHomeOnly from '@/components/NavHomeOnly.vue'
const name = ref('');
const username = ref('');
const password = ref('');

const handleSubmit = () => {
  const userData = {
    name: name.value,
    username: username.value,
    password: password.value,
  };

  // Process the registration data (e.g., send to an API)
  // TODO: Register using API
  console.log('Registering user:', userData);

  // Reset form fields
  name.value = '';
  username.value = '';
  password.value = '';
};
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
  </div>
</template>



<style scoped>
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