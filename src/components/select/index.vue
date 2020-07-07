<template>
  <div>
    <!-- select组件 -->
    <el-select v-model="data.keyWord" placeholder="请选择关键字">
      <el-option v-for="item in options" :key="item.value"
      :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
import {ref,reactive,watch, onMounted} from '@vue/composition-api';
export default {
  props:{
    options:{
      type:Array,
      default:() => []
    }
  },
  setup(props,{root}){
    const data = reactive({
        keyWord:"",
    })
    
    /**
     * DOM加载完成时执行
     */
    onMounted(() => {
      const options = props.options;//接收的配置参数



      //console.log(props.options);
      //和options进行匹配
      // let newArr=[];
      // configOptions.forEach(e => {
      //    data.options.filter((item) => {
      //      if(item.value == e){
      //        newArr.push(item)
      //      }
      //   })
      // });
      
    })

    return {
      data
    }
  }
}
</script>
<style lang="scss" scoped>

</style>