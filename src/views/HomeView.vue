<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onBeforeMount, watch, computed} from 'vue'
import VideoList from "@/components/VideoList.vue"
import NavWithSearch from "@/components/NavWithSearch.vue"

const route = useRoute();
const search = computed(() => route.query.search);
const searchMode = ref(false);
const contentReady = ref(false);
const videos = ref([]);

const searchVideos = ()=> {
  console.log("http://localhost:8080/api/videos?value="+encodeURIComponent(search.value))
  fetch("http://localhost:8080/api/videos?value="+encodeURIComponent(search.value), {
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
      searchMode.value=true;
      videos.value = res.data;
    })
    .catch(err=>{
      console.error("Error fetching video info:", err);
    })
}

const getHomeVideos = ()=>{

  fetch("http://localhost:8080/api/videos", {
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
      videos.value = res.data;
    })
    .catch(err=>{
      console.error("Error fetching video info:", err);
    })
}

watch(videos,()=>{
  contentReady.value=true;
  console.log(videos)
})

onBeforeMount(getHomeVideos)

watch(
  () => route.query.search,
  () => {

    contentReady.value=false;

    if(!search.value){
      console.log(search)
      searchMode.value=false;
      getHomeVideos();
    }
    else{

      contentReady.value=false;
      searchVideos();
      searchMode.value=true
    }

  }
)



</script>

<template>
<NavWithSearch />
  <main v-if="contentReady">
    <h3 v-if="searchMode">Result For {{search}} : {{videos.length}}</h3>
    <div class="not-found" v-if="videos.length === 0">
      <h1>Videos Not Found</h1>
    </div>
    <VideoList :videos="videos" v-else />
  </main>
  <div  class="loading" v-else>
    <h1>Loading....</h1>
  </div>
</template>

<style scoped>
h3{
  margin :2rem;
}
.loading{
  position: fixed;
  top: 40%;
  right: 45%;
}
.not-found{
  position: fixed;
  top: 40%;
  right: 45%;
}
</style>