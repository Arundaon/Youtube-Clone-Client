<script setup>
import Comment from "./Comment.vue"
import {inject, ref} from "vue"
import { getAuthCookie } from '@/utils/Utils'

const props = defineProps({commentProps:Array, videoId:String});
const user = inject("user")
const comment = ref("")
const posting = ref(false)
const comments = ref(props.commentProps)

const postComment = () => {
  posting.value = true;
  fetch(`http://localhost:8080/api/videos/${props.videoId}/comments`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-TOKEN':getAuthCookie()
      },
      body:JSON.stringify({ comment:comment.value })

    },
  ).then(async rawRes => {
    const res = await rawRes.json();
    if(!rawRes.ok){
      throw new Error(res.errors);
    }
    updateCommentList();
    posting.value = false;
    comment.value="";
  })
    .catch(err=> {
      posting.value = false;
      comment.value="";
    })

}

const updateCommentList = () =>{

  fetch("http://localhost:8080/api/videos/"+props.videoId, {
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
      comments.value = res.data.comments
    })
    .catch(err=>{
      console.error("Error fetching video info:", err);
    })
}
</script>

<template>
  <div class="comments">
    <div class="title">
      {{comments.length}} Comments
    </div>

    <RouterLink v-if="(user == null)" to="/login">
      <div class="login-direction">
        <h2>Login to comment</h2>
      </div>
    </RouterLink>

    <form @submit.prevent="postComment" class="post-comment" v-else>
      <textarea name="new-comment" id="new-comment" placeholder="Add a comment..." v-model="comment"></textarea>
      <div v-if="posting" class="posting">Posting...</div>
      <button type="submit">
        Comment
      </button>
    </form>
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>

</template>

<style scoped>
button{
  align-self: flex-end;
  color: #EEEEEE;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #007bff;
}

.login-direction{
  width: 100%;
  background-color: #202020;
  padding: 1.5rem;
  display: flex;
  border-radius: 0.7rem;
  justify-content: center;
  margin: 1rem 0rem;
}
#new-comment{
  padding: 0.5rem;
    resize: none;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  font-size: 14px;
}
.post-comment{
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
}
.comments{
  margin: 1rem;
  min-height: 1rem;
}
.title{
  font-size: 20px;
  font-weight: bold;
}
</style>