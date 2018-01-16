<template>
  <div class="head">
    <a v-if="isDisplay" href="javascript:" class="tab-a">gg</a>
    <a href="javascript:;" class="tab-a active">kk</a>
    <span>{{num}}</span>
    <button @click="add">加1</button>
    <img src="../img/web.jpg" alt="">
    <div class="cssimg"></div>
     <a href="page1.html">jump to page1</a>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        num: 11122,
        isDisplay: false
      }
    },
    computed: {
      
    },
    methods: {
      add(){
        this.num++
      }
    }
  }
</script>


<style lang="scss" src='../css/index.scss' scoped>