<template>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg> 
</template>
<script>
import { reactive,ref, onMounted, set, computed } from '@vue/composition-api';
export default {
  name:"SvgIcon",
  props:{
    iconClass: {
        type: String,  // 定义接收的值类型
        default: ''
    },
    className : {
        type: String,
        default: ''
    }
  },
  setup(props){
    
    // 计算属性，得出最终结果，并返回
    const svgClass = computed(() => {
        if(props.className) {
            return `svg-icon ${props.className}`
        }else{
            return `svg-icon`
        }
    })

    const iconName = computed(() => `#icon-${props.iconClass}`)

    return {
        iconName,
        svgClass
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    //fill:#fff;//svg 改变颜色就用用fill属性
}
</style>
