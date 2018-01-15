<template>
  <div class="head">
    <a href="javascript:" class="tab-a">gg</a>
    <a href="javascript:;" class="tab-a active">kk</a>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      
    },
    methods: {
    
    }
  }
</script>

<style lang="scss" scope>
  $red : #d61318;
  .head{
    position: fixed;
    top: 0;
    z-index: 100;
    width: 18.75rem;
    // width: 18.75rem;
    height:2.2rem;
    line-height:2.2rem;
    text-align: center;
    background: $red;
    .tab-a{
      padding: .2rem .45rem;
      font-size: .7rem;
      color: #ffffff;
      border-radius: .2rem;
    }
    .active{
      color: $red;
      background: #ffffff;
    }
  }
</style>
