<script setup>
import {ref} from 'vue';
import {timeAgo} from '@/utils/Utils'
const isLiked = ref(false);
const likeCount = ref(0)

defineProps({video:Object});

const likeUnlike= ()=>{

  isLiked.value=!isLiked.value
  likeCount.value = likeCount.value + 1
}
</script>

<template>
  <div  id="video-component">
    <video  id="video" controls>
      <source :src="`http://localhost:8080/contents/${video.video}`" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="video-info">
      <div class="video-title">
        {{ video.title }}
      </div>
      <div class="top-info">
        <div class="channel-info">
          <img v-if="video.uploader.profile != null" class="channel-profile" :src="`http://localhost:8080/contents/${video.uploader.profile}`" alt="channel profile" >
          <img v-else src="../assets/default_profile.svg" alt="profile" class="channel-profile" >
          <div class="channel-name">
            {{video.uploader.name}}
          </div>
        </div>
        <div class="like" :class="{liked:isLiked}" @click="likeUnlike">
          <img class="like-image" src="@/assets/like.svg">
          <div class="like-count">{{ likeCount }}</div>
        </div>
      </div>
      <div class="bottom-info">
        <div class="views-upload">
        <span class="views">
            5 views
        </span>
          <span class="upload">
            {{ timeAgo(video.createdAt) }}
        </span>
        </div>
        <div class="description">
          {{ video.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#video-component{
  padding: 1rem 1.5rem;
}
#video{
  width: 100%;
  height: 502px;
  border-radius: 2%;
}
.video-info{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0rem;
}

.top-info{
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0rem;
}

.channel-profile{
  width: 3rem;
  height: 3rem;
  margin-right:1rem;
  border-radius: 50%;
}
.channel-info{
  font-weight: bold;
  display: flex;
  align-items: center;
}

.bottom-info{
  background-color: #252525;
  padding: 0.7rem 0.7rem;
  display: flex;
  flex-direction: column;
  min-height: 4rem;
  border-radius: 1rem;
}
.views{
  margin-right: 1rem;
}
.views-upload{
  display: flex;
  margin: 0rem 0rem 0.5rem;
  font-weight: bold;


}

.video-title{
  font-size: 20px;
  font-weight: bold;
}
.channel-name{
  font-size: 16px;
}

.like{
  display: flex;
  align-items: center;
  width: 5rem;
  justify-content: space-evenly;
  background-color: #222222;
  border-radius: 10%;
  cursor: pointer;
}

.like-image{
  height: 2rem;
  width: 2rem;
  filter: invert(100%);
}

.liked{
  filter: invert(100%);
}
</style>