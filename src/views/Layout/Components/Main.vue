<template>
  <div class="main-wrap">
    <div class="main-content">
      <div class="main-con">
        <router-view /> 
      </div>
    </div>
  </div>
</template>
<script>

export default {
  
}
</script>
<style lang="scss" scoped>
.main-wrap{
  flex:1;
  height: 100vh;
  background: #f1f1f1;
  padding-top: 105px;
  padding-left: 30px;
  box-sizing: border-box;
  .main-content{
    width: 100%;
    height: 100%;
    padding: 30px 30px 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    background:#fff;
    .main-con{
      width: 100%;
      height: 100%;

    }
  }
}
</style>