<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import VideoList from "@/components/VideoList.vue"
import NavWithSearch from "@/components/NavWithSearch.vue"


const search = ref("");
const videos = ref({id:String});



</script>

<template>
<NavWithSearch />
  <main>
    <VideoList />
  </main>
</template>

<style scoped>

</style>