import { createRouter, createWebHistory } from 'vue-router'
import authService from '../services/auth.service'
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

  //Setting title
  document.title = "Laga Mat | " + to.meta.title

  //Checking auth
  const canAccess = authService.authUser()

  //Redirecting
  if(to.name !== "login" && !canAccess){ 
    return {
      path: "/login",
      query: { redirect: to.fullPath }
    }
  }
  else if(to.name === "login" && canAccess){ 
    return {
      path: "/"
    }
  }

  return true

})

export default router
