<template>
  <div class="header">
    <!-- 假如是header组件 -->
    <slot name="headLeft"></slot>
    <h1>我是标题</h1>
    <slot name="headRight"></slot>
  </div>
</template>
<style lang="scss" scoped>
.header{
   h1{
     text-align: center;
     font-size: 30px;
   }
   
  
}
</style>