<template>
  <div class="language">
    <div class="base-line"></div>
    <div class="item">
      <div class="hang-line hang-line-1"></div>
      <div class="menu-container">
        <div class="menu">英语单词</div>
      </div>
    </div>
    <div class="item">
      <div class="hang-line hang-line-2"></div>
      <div @click="map" class="menu-container">
        <div class="menu">五十音图</div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    methods:{
        map(){
            this.$router.push("/map")
        }
    }
});
</script>
<style scoped>
.language {
  margin: auto;
  width: 75%;
}
.item {
  width: 50px;
  float: left;
  margin: 0px 45px 0px 0px;
  user-select: none;
}
.base-line {
  margin-top: 50px;
  width: 50;
  height: 0px;
  border: 5px solid #cee7ff;
  border-radius: 5px;
}
.hang-line {
  margin: auto;
  width: 0px;
  border: 2px solid #cee7ff;
}
.hang-line-1 {
  height: 65px;
}
.hang-line-2{
    height: 93px;
}
.menu-container {
  width: 100%;
  background-color: #cee7ff;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
.menu {
  margin: auto;
  width: 20px;
}
/** division line animation below---------------------------------  */
@keyframes menu-item {
}
</style>