<template>
  <div class="layout-wrap" :class="[isCollapse ? 'close' : 'open']">
    <LayoutNav />
    <LayoutHeader />
    <LayoutMain />
    
  </div>
</template>
<script>
import {ref,reactive,computed} from '@vue/composition-api';
import LayoutHeader from './Components/Header.vue';
import LayoutMain   from './Components/Main.vue';
import LayoutNav    from './Components/Nav.vue';

export default {
  components:{LayoutHeader,LayoutMain,LayoutNav},
  setup(props,{root}){
    //computed 监听数据改变 - 开关状态
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    })

    /**
     * return 
     */
    return {
      isCollapse,

    }
  }
}
</script>
<style lang="scss" scoped>
.layout-wrap{
  display: flex;
}
</style>