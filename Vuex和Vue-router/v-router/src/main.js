import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// 将router对象传入vue中进行挂载，这样才可以使用this.$router\this.$route
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
