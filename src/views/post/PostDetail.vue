<template>
  <div >
    <div class="post-detail" v-if="post != undefined" v-html="post.format"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, nextTick, watch } from "vue";
import "highlight.js/styles/androidstudio.css";
import hljs from "highlight.js";
import { Post } from "../types";
import { get } from "@/utils/request";
export default defineComponent({
  props: {
    postId: String,
  },
  setup(props) {
    const post = ref<Post>();
    const { postId } = toRefs(props);
    const getPost = () => {
      get("/post?id=" + postId?.value).then((res) => {
        post.value = res.data as Post;
      });
    };
    watch(post, () => {
      nextTick(() => {
        hljs.highlightAll();
      });
    });
    return {
      post,
      getPost,
    };
  },
  mounted() {
    this.getPost();
  },
});
</script>
<style scoped>
.post-detail{
    margin: auto;
    width: 85%;
}
</style>
<style>
.post-detail p{
    font-size: 15px;
    color: rgb(78, 78, 78);
}
</style>