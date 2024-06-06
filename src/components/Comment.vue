<script setup>
import {timeAgo} from "@/utils/Utils"

defineProps({comment:Object})

</script>

<template>
<div class="comment">
  <img v-if="comment.user.profile != null"  :src="`http://localhost:8080/contents/${comment.user.profile}`" alt="profile" class="profile" >
  <img v-else src="../assets/default_profile.svg" alt="profile" class="profile" >
  <div class="info-body">
    <div class="info">
        <span class="username">
          @{{comment.user.username}}
        </span>
        <span class="uploaded-at">
          {{ timeAgo(comment.createdAt) }}
        </span>
    </div>
    <div class="body">
      {{ comment.comment }}
    </div>
  </div>
</div>
</template>

<style scoped>
.comment{

  display: flex;
  margin: 2rem 1rem;
}
.profile{
  width: 3rem;
  height: 3rem;
  margin-right:1rem;
  border-radius: 50%;
}

.info-body{
  background-color: #252525;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
}

.info{
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

}
.body{
  min-height: 1rem;
}

.username{
  margin-right: 0.5rem;
  font-size: 13px;
  font-weight: bold;
}
.uploaded-at{
  font-size: 12px;
  font-weight: lighter;
}
</style>