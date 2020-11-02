import Vue from "vue";
import Router from "vue-router";
import layout from "@/views/layout";

Vue.use(Router);

export const constantRouterMap = [{
    path: "/login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    component: layout,
    redirect: "/home",
    children: [{
      path: "/home",
      name: "home",
      component: () => import("@/views/home"),
      meta: {
        title: "首页"
      }
    }]
  },
  {
    path: "*",
    component: layout,
    redirect: "/home"
  },

  // {
  //   path:'/404',
  //   name:'404',
  //   component:() => import('@/views/404')
  // }
];

export default new Router({
  // mode: 'history', //取消导航中的 #
  routes: constantRouterMap
});
