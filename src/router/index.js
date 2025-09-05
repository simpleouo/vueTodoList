import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: () => import('../views/TodoView.vue'),
      meta: { requiresAuth: true },
    }
  ],
})

//= 路由守衛 =
//可設定路由進入條件，如果不符合就倒頁
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: "/todolist",
//       name: "todolist",
//       component: TodoListView,
//       meta: { requiresAuth: true },
//     }
//   ],
// });
router.beforeEach((to, from, next) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )

  if (to.meta.requiresAuth && !token) {
    next("/");  // 未登入導向 login
  } else if ((to.path === "/" || to.path === "/sign") && token) {//to.path === "/login" || to.path === "/register"
    next("/todolist") // 已登入直接到至 todoList
  } else {
    next(); // 通過驗證
  }
});

export default router
