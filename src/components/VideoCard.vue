<script setup>

import { timeAgo }  from '@/utils/Utils'

defineProps({video:Object});

</script>

<template>

  <div class="video-card">
    <RouterLink :to="{name:'watch', query : {v: video.id} }">
    <img alt="Video Thumbnail" class="thumbnail" :src="`http://localhost:8080/contents/${video.thumbnail}`">
    </RouterLink>
    <div class="video-card-wrapper">
      <img  alt="profile" class="video-profile" :src="`http://localhost:8080/contents/${video.uploader.profile}`" v-if="video.uploader.profile != null">
      <img  alt="profile" class="video-profile" src="../assets/default_profile.svg" v-else>
      <div class="video-info">
        <div class="video-title">
          {{ video.title }}
        </div>
        <div class="video-channel">
          {{ video.uploader.name }}
        </div>
        <div class="video-detail">
          <div class="video-views">
            {{ video.views }} views
          </div>
          <div class="video-upload-time">
            {{ timeAgo(video.createdAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.video-card{
  width: 25rem;
  height: 20rem;
  margin: 1rem 0.7rem;
}

.video-card .thumbnail{
  display: block;
  height: 14.5rem;
  margin-bottom: 0.5rem;
  width: 25rem;
  border-radius: 3%;
}

.video-card-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5rem;
}

.video-profile{
  margin: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.video-info{
  //margin: 1rem 0rem;
  width: 20rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.video-title{
  font-size: 16px;
  font-weight: bold;
}
.video-detail{
  display: flex;
  flex-direction: row;
  //justify-content: space-evenly;
  align-items: center;
}
.video-detail div{
  margin-right: 1rem;
}
</style>