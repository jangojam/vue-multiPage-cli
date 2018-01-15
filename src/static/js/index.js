import index from '../component/index.vue'
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    template: '<App/>',
    components: { index }
  })
  export default app