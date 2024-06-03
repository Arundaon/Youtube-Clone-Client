<script setup>
import { defineProps } from 'vue'
import {ref,  computed } from 'vue';
import { useRoute } from 'vue-router';


const props = defineProps([])
const route = useRoute();
const videoId = computed(() => route.query.v);
const isLiked = ref(false);

const likeUnlike= ()=>{

  isLiked.value=!isLiked.value
  console.log("cliked")
}
</script>

<template>
  <div id="video-component">

    <video id="video" controls>
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="video-info">
      <div class="video-title">
        Title
      </div>
      <div class="top-info">
        <div class="channel-info">
          <img class="channel-profile" src="https://picsum.photos/100/100" alt="channel profile" >
          <div class="channel-name">
            The Best Channel
          </div>
        </div>
        <div class="like" :class="{liked:isLiked}" @click="likeUnlike">
          <img class="like-image" src="@/assets/like.svg">
          <div class="like-count">10</div>
        </div>
      </div>
      <div class="bottom-info">
        <div class="views-upload">
        <span class="views">
            5 views
        </span>
          <span class="upload">
            4 Months Ago
        </span>
        </div>
        <div class="description">
          lorem ipsum dolor sil amet
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#video-component{
  display: flex;
  flex-direction: column;
  height: 110vh;
  padding: 1.5rem;
  width:892px;
}
#video{
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
  min-height: 6rem;
  border-radius: 3%;
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
  //margin-right: 1rem;
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