import Vue from 'vue';
import Route from 'vue-router';
import HelloWorld from './components/HelloWorld';
import A from './components/A';
// import B from './components/B';
// 引入路由插件
Vue.use(Route);
// 路由配置(路由与组件间的关系)
const routes = [
  { path: '/a', component: A, meta: { title: 'A' } },
  //   { path: '/b', component: B },
  {
    path: '/hello-world',
    component: HelloWorld,
    meta: { title: 'hello-world' }
  }
];
// 初始化整个router
const router = new Route({
  routes
});

console.log('router==', router);

Vue.mixin({
  // 混入每个组件beforeCreate生命周期前执行此函数
  beforeCreate() {
    // this.$router  路由对象（包含所有的路由信息）  打印日志显示 VueRouter对象
    // this.$route   当前页的路由信息               打印日志显示 普通对象
    console.log('beforeCreate 路由==', this.$router, this.$route);
    if (this.$route.meta.title) {
      document.title = this.$route.meta.title;
    } else {
      document.title = 'no title';
    }
  }
  // 通过函数名称进行指定执行某个函数
  // beforeCreate: '函数名'
});

// 路由守卫（钩子函数） 与组件的声明周期类似
// 守卫分两种：全局守卫、局部守卫
// 全局守卫：设置每个路由组件执行，都会触发的钩子函数（无法获取vue实例）

// 目前在router.js,可以拿到router对象，如果在vue文件内可通过this.$router获取

// 路由的生命周期在组件的生命周期前执行完
// 在路由进入之前被调用（目的地，起始地，继续函数）
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from);
  //   if (to.meta.title) {
  //     document.title = to.meta.title;
  //   } else {
  //     document.title = 'no title';
  //   }
  next();
});
// 路由被解析之前被调用
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve', to, from);
  next();
});
// 路由进入之后被调用
router.afterEach((to, from) => {
  console.log('afterEach', to, from);
});

export default router;
