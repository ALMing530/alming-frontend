<template>
  <Header :logo="'ALMing'" :navs="navs" @menu-change="menuChange" />
  <Body :currentComponent="currentComponent" />
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import Header from "@/components/base-component/Header.vue";
import { HeaderNav } from "@/components/base-component/types";
import Body from "@/components/base-component/Body.vue";
export default defineComponent({
  data() {
    return {
      navs: [
        reactive<HeaderNav>({ title: "博文记录", componetPath: "/post" }),
        reactive<HeaderNav>({ title: "Q&A", componetPath: "/test" }),
        reactive<HeaderNav>({ title: "工具", componetPath: "/test" }),
        reactive<HeaderNav>({ title: "外语", componetPath: "/language" }),
      ],
      currentComponent: "post",
    };
  },
  components: {
    Header,
    Body,
  },
  methods: {
    // eslint-disable-next-line
    menuChange(index: number, item: any) {
      this.currentComponent = item.componetPath;
    },
  },
});
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0px;
}
#app {
  margin: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.clear {
  width: 100%;
  height: 0px;
  clear: both;
}
@font-face {
  font-family: JetBrains;
  src: url("./assets/fonts/JetBrainsMono-Regular.woff2");
}
code {
  font-family: JetBrains;
}
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background-color: rgb(209, 209, 209);
}
/* ::-webkit-scrollbar-track  
{  
    border-radius: 5px;  
  background-color: rgb(209, 209, 209);

}   */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #aaa;
}
::-webkit-scrollbar-thumb:horizontal{
  border-radius: 0px;
}
</style>
