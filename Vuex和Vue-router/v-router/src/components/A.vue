<template>
  <div>
    componentA
    <button @click="addRoute">添加组件B的路由配置</button>
    <router-link to="/b">跳转b路由</router-link>
  </div>
</template>
<script>
import B from './B';
export default {
  methods: {
    addRoute() {
      this.$router.addRoutes([
        { path: '/b', component: B, meta: { title: 'B' } }
      ]);
    }
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },

  // 局部守卫，直接写在组件内（比组件的生命周期之前执行）

  // 第一次触发此组件对应的路由（在全局组件beforeEach与beforeResolve间被调用）
  beforeRouteEnter(to, from, next) {
    // 不能获取组件实例 `this`（因为在组件beforeCreate之前执行）
    console.log('beforeRouteEnter', to, from);
    next();
  },
  // 连续调用此组件，并且参数不同（在全局组件beforeEach与beforeResolve间被调用）
  // 修改传入参数并刷新地址栏，由于此路由对应的组件已经实例化，就不会触发此组件对应的生命周期函数，只会触发路由的生命周期函数
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate', to, from);
    next();
  },
  // 切换路由后，当前组件的局部路由beforeRouteLeave函数最先触发，接着触发全局的路由生命周期，最后进行组件销毁（解绑）
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave', to, from);
    next();
  }
};
</script>
