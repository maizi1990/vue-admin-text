<template>
  <div id="nav-wrap" >
    <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    :collapse="isCollapse"
    background-color="transparent" 
    text-color="#fff" 
    active-text-color="#fff"	
    router 
    :unique-opened="true" >
    <template  v-for="(item,index) in routers">
      <el-submenu :index="index+''" :key="index" v-if="item.meta">
        <!-- 一级 -->
        <template slot="title">
           <svgIcon :iconClass="item.meta.icon" :className="item.meta.icon" />
          <!-- <i :class="'el-icon-'+item.meta.icon"></i>  -->
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <!-- 二级 -->
        <el-menu-item 
        v-for="(subItem,subIndex) in item.children" 
        :key="subIndex" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
      </el-submenu>
    </template>
    </el-menu>


   
   
  </div>
</template>
<script>
import {ref,reactive,computed} from '@vue/composition-api';
export default {
  setup(props,{root}){
    
    /**
     * computed 监听数据改变
     */
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse
    })



    
    /**
     * 数组、对象数据
     */
    const routers = reactive(root.$router.options.routes);
    //console.log(routers);
  
    return {
      isCollapse,
      routers,
     
   
    }
  }
}
</script>

<style lang="scss" >
@import "@/styles/config.scss";
#nav-wrap{
  height: 100vh;
  background: #344A5F;
  
}
.open #nav-wrap{
  flex: 0 0 $navWidth;
}
.close #nav-wrap{
  flex: 0 0 $navWidthMin;
  @include webkit(transition, all 0.3s ease 0s);
}
svg {
    font-size: 20px;
    margin-right: 10px;
    fill:#fff;//svg颜色  用fill
  }

</style>