<script setup>
import VideoCard from "./VideoCard.vue"
import {ref} from "vue"
const videos = ref([{
  id:"thevideoid",
  thumbnail:"https://picsum.photos/505/400",
  title:"Video baru dari blabla",
  profile:"https://picsum.photos/105/100",
  channel:"channelku",
  views:5,
  upload:5
}, {
  id:"thevideoid",
  thumbnail:"https://picsum.photos/510/400",
  title:"Video baru dari blabla",
  profile:"https://picsum.photos/110/100",
  channel:"channelku",
  views:7,
  upload:7
}, {
  id:"thevideoid",
  thumbnail:"https://picsum.photos/500/400",
  title:"Video baru dari blabla",
  profile:"https://picsum.photos/100/100",
  channel:"channelku",
  views:9,
  upload:9
}]);

// const posts = ref([
//   { id: 1, title: 'My journey with Vue' },
//   { id: 2, title: 'Blogging with Vue' },
//   { id: 3, title: 'Why Vue is so fun' }
// ])
</script>

<template>
  <div class="video-list">

    <VideoCard v-for="video in videos" :key="video.id" :id="video.id" :title="video.title" :thumbnail="video.thumbnail" :profile="video.profile" :channel="video.channel" :views="video.views" :upload="video.upload"/>

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