import { createRouter, createWebHistory } from "vue-router";

import LoginVue from "../components/LoginVue.vue";
import UploadVue from "../components/UploadVue.vue";
import RegisterVue from "../components/RegisterVue.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path: "/register",
      name: "register",
      component: RegisterVue,
    },
    {
      path: "/login",
      name: "login",
      component: LoginVue,
    },
    {
      path: "/upload",
      name: "upload",
      component: UploadVue,
    }
  ],
});

export default router;