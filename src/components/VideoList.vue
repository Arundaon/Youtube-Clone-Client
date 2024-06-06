<script setup>
import VideoCard from "./VideoCard.vue"
import {ref} from "vue"
defineProps({videos:Array})

</script>

<template>
  <div class="video-list">

    <VideoCard v-for="video in videos" :key="video.id" :video="video"/>


  </div>
</template>

<style scoped>
.video-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 2rem;
  transition: all 1s;
}

</style>