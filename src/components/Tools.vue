<template>
  <div class="tools">
    <div class="time">
      <div class="clock-block"></div>
     <Clock></Clock>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Clock from './Clock.vue'
export default defineComponent({
  components:{
    Clock
  },
});
</script>
<style scoped>
.time {
  margin: 10px;
  text-align: center;
}
.clock-block{
  width: 100%;
}
</style>