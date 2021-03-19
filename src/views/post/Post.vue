<template>
  <div>
    <div v-if="isPostList" class="post-list">
      <div v-for="item in datas" :key="item.Id">
        <div class="post-item">
          <p @click="toDetail(item.id)" class="post-title">{{ item.title }}</p>
          <p class="post-summary">{{ item.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { get } from "@/utils/request";
import { Post } from "../types";

export default defineComponent({
  data() {
    return {
      isPostList: true,
    };
  },
  methods: {
    toDetail(id: number) {
      this.$router.push("/postdetail/"+id);
    },
  },
  setup() {
    const datas = ref<Post[]>();
    const getPosts = () => {
      get("/posts").then((res) => {
        datas.value = res.data;
      });
    };
    return {
      datas,
      getPosts,
    };
  },
  mounted() {
    this.getPosts();
  },
});
</script>
<style scoped>
.post-item {
  margin: auto;
  width: 80%;
  border-bottom: 1px rgb(210, 210, 210) solid;
  margin-bottom: 15px;
}
.post-title {
  margin: 0px;
  color: rgb(122, 122, 122);
  font-weight: bold;
  cursor: pointer;
}
.post-title:hover {
  text-decoration: underline;
}
.post-summary {
  font-size: 14px;
  color: rgb(165, 165, 165);
  cursor: default;
}
</style>