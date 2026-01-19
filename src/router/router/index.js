import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: HomeView,
      meta: {
        title: "Kontrollpanel",
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Logga in",
      }
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
      meta: {
        title: "Lager",
      }
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      meta: {
        title: "Användare",
      }
    }
  ],
})

router.beforeEach((to, from) => {
  document.title = "Laga Mat | " + to.meta.title
})

export default router
