<template>
  <div class="header">
    <div class="header-left">
      <span class="logo">{{ logo }}</span>
    </div>
    <div class="header-right">
      <ul>
        <li
          v-for="(item, index) in navs"
          :key="item"
          :class="[{ active: index == currentMenuIndex }]"
          @click="menuClick(index, item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
  <div class="clear"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {HeaderNav} from './types'
export default defineComponent({
  props: {
    logo: String,
    navs: {
      type: Object as PropType<HeaderNav[]>,
      required: true,
    },
  },
  emits:['menu-change'],
  setup(props, context) {
    console.log(props, context);
    const currentMenuIndex = ref(0);
    const menuClick = (clickIndex: number, item: unknown) => {
      currentMenuIndex.value = clickIndex;
      context.emit("menu-change", clickIndex, item);
    };
    return {
      currentMenuIndex,
      menuClick,
    };
  },
  watch:{
    $route(n,o){
      if(o.path=='/'){
        this.navs.forEach((item,index)=>{
          if(item.componetPath==n.path){
            this.currentMenuIndex =index
          }
        })
      }
    }
  }
});
</script>
<style scoped>
.header{
  position:fixed;
  width: 100%;
  height: 45px;
  top: 0px;
  background-color: rgba(235, 235, 235, 0.8);
  user-select: none;
}
.header-left {
  width: 35%;
  height: 45px;
  line-height: 45px;
  text-align: left;
  float: left;
  padding-left: 20px;
}
.logo {
  font-size: 32px;
  font-weight: bold;
  color: #409eff;
}
.header-right {
  width: 65%;
  height: 45px;
  float: left;
  text-align: right;
}
ul {
  list-style: none;
  margin: 0px;
}
ul li {
  display: inline-block;
  width: 20%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
}
ul li:hover {
  border-bottom: 2px solid #409eff;
}
.active {
  border-bottom: 2px solid #409eff;
  color: #8cc4fd;
}
</style>