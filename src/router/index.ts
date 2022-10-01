import type {RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw} from "vue-router";
import type { Plugin} from "vue";
import {createRouter, createWebHistory} from "vue-router";
import logger from "@/utils/logger";
export const installRouter: Plugin = (app)=> {
  logger.info('installRouter plugin instanciated')
  const routes: Array<RouteRecordRaw>  = [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route,
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ];
  logger.info('installRouter routes created')
  const Router = createRouter({
    history: createWebHistory(),
    routes:routes,
    scrollBehavior(_to: RouteLocationNormalized, _from: RouteLocationNormalizedLoaded, savedPosition) {
      return savedPosition || { left: 0, top: 0 };
    },
  });
  logger.info('installRouter router created instanciated')
  app.use(Router)
  logger.info('installRouter router applied instanciated')
}