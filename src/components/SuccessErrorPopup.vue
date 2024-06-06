<script setup>

</script>

<template>
  <div v-if="showSuccessPopup" class="popup">
    <p>Login successful!</p>
    <br>
    <button @click="redirectLogin">Go to Login</button>
  </div>

  <div v-if="showErrorPopup" class="popup">
    <p>Login failed: {{ errorMessage }}</p>
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