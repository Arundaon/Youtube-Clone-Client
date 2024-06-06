<script setup>
import NavWithSearch from '@/components/NavWithSearch.vue'
import Video from '@/components/Video.vue'
import CommentList from '@/components/CommentList.vue'
import {ref,  computed, onBeforeMount, watch} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoId = computed(() => route.query.v);
const contentReady = ref(false);
const video = ref({});



const getVideoInfo = ()=>{

  fetch("http://localhost:8080/api/videos/"+videoId.value, {
    method:"GET",
    headers:{
      'Accept': 'application/json',
    }
  })
    .then(async rawRes =>{
      const res = await rawRes.json();
      if(!rawRes.ok){
        throw new Error(res.errors);
      }
      video.value = res.data;
    })
    .catch(err=>{
      console.error("Error fetching video info:", err);
    })
}

watch(video,()=>{
  contentReady.value=true;
})


onBeforeMount(getVideoInfo)

</script>

<template>
  <NavWithSearch />
  <div v-if="contentReady" class="content">
    <Video :video="video" />
    <CommentList :commentProps="video.comments" :videoId="videoId"/>
  </div>

  <div  class="loading" v-else>
    <h1>Loading....</h1>
  </div>
</template>

<style scoped>
.loading{
  position: fixed;
  top: 40%;
  right: 45%;

}
.content{
  width:892px;
  margin: auto;
}
</style>