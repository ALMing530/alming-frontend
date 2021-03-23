<template>
  <div class="word-body">
    <div class="word-container">
      <table class="words-table">
        <colgroup>
          <col span="1" :width="colWidth" />
          <col span="1" :width="colWidth" />
        </colgroup>
        <thead>
          <tr>
            <th>英文</th>
            <th>中文释义</th>
          </tr>
        </thead>
        <tr v-for="item in words" :key="item.id" style="text-align: center">
          <td>{{ item.en }}</td>
          <td>{{ item.cn }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Word } from "../types";
import { get } from "@/utils/request";
export default defineComponent({
  data() {
    return {
      colWidth: 200,
    };
  },
  setup() {
    const words = ref<Word>();
    const getWords = () => {
      get("/words").then((res) => {
        words.value = res.data;
      });
    };
    return {
      words,
      getWords,
    };
  },
  mounted() {
    this.getWords();
  },
});
</script>
<style scoped>
.words-table{
  margin: auto;
}
.word-container {
  margin: auto;
  width: 85%;
  height: 35px;
}
tr{
  height: 35px;
  line-height: 35px;
  color: grey;
}
th,td{
  text-align: left;
}
</style>