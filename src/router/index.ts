import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Post from '@/views/post/Post.vue'
import Temp from '@/views/temp.vue'
import PostDetail from '@/views/post/PostDetail.vue'
import Language from '@/views/language/Language.vue'
import English from '@/views/language/English.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: "/post"
  },
  {
    path: '/post',
    name: 'Home',
    component: Post
  },
  {
    path: "/test",
    name: "test",
    component: Temp
  },
  {
    path: "/postdetail/:postId",
    name: "postdetail",
    component: PostDetail,
    props: true
  },
  {
    path:'/english',
    name:'english',
    component:English
  },
  {
    path:'/language',
    name:'language',
    component:Language
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
