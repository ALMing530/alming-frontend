<template>
  <div class="body">
    <div class="body-left">
      <router-view></router-view>
      <!-- <component :is="currentComponent"></component> -->
    </div>
    <div class="body-right">
      <Tools />
    </div>
    <div class="clear"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Tools from "@/components/Tools.vue";
// import Post from "@/views/Post.vue";
export default defineComponent({
  components: {
    Tools,
    // Post,
  },
  watch:{
    currentComponent(componentName){
      this.$router.push(componentName)
    }
  },
  props: {
    currentComponent: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.body {
  margin: 10px;
  padding-top: 45px;
}
.body-left {
  width: 75%;
  float: left;
}
.body-right {
  width: 25%;
  float: left;
}
</style>