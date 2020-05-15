import router from './router';
import store from './store';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Nprogress.configure({
  showSpinner: false
});

import filterAsyncRouter from "@/utils/filterAsyncRouter";

import {
  getToken
} from '@/utils/auth';

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log(to, from)
  Nprogress.start();
  if (getToken()) {

    if (to.path === '/login') {
      console.log(11)
      next({
        path: `${from.path}`
      })
      Nprogress.done();
    } else {
      console.log(12)
      if (store.getters.menu.length === 0) {
        store.dispatch("comm/qxregion");
        //获取权限菜单
        store.dispatch('qxuser/querySystemMenus').then(res => {
          let routeData = res.data.router; //返回的权限路由数据
          let routeLocal = filterAsyncRouter(routeData);
          router.addRoutes(routeLocal);
        })
        next();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(21)
      next()
    } else {
      console.log(22)
      next(`/login?redirect`);
      Nprogress.done()
    }
  }
});

router.afterEach(() => {
  Nprogress.done()
});
