<template>
<div>
   <el-row :gutter="0">
    <!-- 省 -->
    <el-col :span="6">
      <el-select v-model="data.province" placeholder="省" @change="handerProvince"> 
        <el-option v-for="item in data.provincesOptions" 
        :key="item.PROVINCE_CODE" 
        :value="item.PROVINCE_CODE" 
        :label="item.PROVINCE_NAME"></el-option>
      </el-select>
    </el-col>
    <!-- 市 -->
    <el-col :span="6">
      <el-select v-model="data.city" placeholder="市" @change="handerCity">
        <el-option v-for="(item,index) in data.citysOptions" 
        :key="item.CITY_CODE" 
        :value="item.CITY_CODE" 
        :label="item.CITY_NAME"></el-option>
      </el-select>
    </el-col>
    <!-- 区 -->
    <el-col :span="6">
      <el-select v-model="data.area" placeholder="区"  @change="handerArea">
        <el-option v-for="(item,index) in data.areasOptions"
        :key="item.AREA_CODE" 
        :value="item.AREA_CODE" 
        :label="item.AREA_NAME"></el-option>
      </el-select>
    </el-col>
    <!-- 街 -->
    <el-col :span="6">
      <el-select v-model="data.street" placeholder="街"  @change="handerStreet" >
        <el-option v-for="(item,index) in data.streetsOptions" 
        :key="item.STREET_CODE" 
        :value="item.STREET_CODE" 
        :label="item.STREET_NAME"></el-option>
      </el-select>
    </el-col>
  </el-row> 
</div>
</template>
<script>
import {GetCityPicker} from "@/api/common.js"
import { reactive, onMounted, watch } from '@vue/composition-api'
export default {
  props:{
    cityPickerdata:{
      type:Object,
      default:() => {}
    }
  },
  setup(props,{root,refs,emit}){
    const data = reactive({
      provincesOptions:[],//省
      province:"",
      citysOptions:[],//市
      city:"",
      areasOptions:[],//区
      area:"",
      streetsOptions:[],//街
      street:"",
    })
    /**
     * value 集合 (提取出关键数据，最后返回出去---为啥不返回上面的data？大概是数据量多)
     */
    const finalValues = reactive({
       province:"",
       city:"",
       area:"",
      street:"",
    })

    /**
     * 获取省 数据
     */
    const getProvince = () => {
      //置空value
      
      GetCityPicker({type:"province"}).then((result) => {
        data.provincesOptions = result.data.data.data
      }).catch((err) => {
        
      });
    }
    /**
     * 操作省份----获取市 数据
     */
    const handerProvince = () => {
      //置空value
      resetvalue({type:"city"})
      
      let province_code = data.province
      GetCityPicker({type:"city",province_code}).then((result) => {
        data.citysOptions = result.data.data.data
      }).catch((err) => {
        
      });
    }
    /**
     * 操作市----获取区 数据
     */
    const handerCity = () => {
      //置空value
      resetvalue({type:"area"})
    
      let city_code = data.city
      GetCityPicker({type:"area",city_code}).then((result) => {
        data.areasOptions = result.data.data.data

      }).catch((err) => {
        
      });
    }
    /**
     * 操作区----获取街 数据
     */
    const handerArea = () => {
      //置空value
      resetvalue({type:"street"})
      let area_code = data.area
      GetCityPicker({type:"street",area_code}).then((result) => {
        data.streetsOptions = result.data.data.data
      }).catch((err) => {
        
      });
    }
    /**
     * 操作街
     */
    const handerStreet = () => {
      //置空value
      resetvalue({type:""})
     
    }
    /**
     * 切换选项，其他置空
     */
     const resetvalue = (params) => {
       const vlaueJson = {
         city:["city","area","street"],
         area:["area","street"],
         street:["street"]
       }
       //置空其他
       if(params.type!==""){
         vlaueJson[params.type].forEach((item) => {
          data[item] = ""
        })
       }
       
       //value 集合
       result()
       
     } 
     /**
      * 返回数据集合
      */
     const result = () => {
       for(let key in finalValues){
         finalValues[key] = data[key]
       }
       //console.log(finalValues);
     }
     /**
      * 数据监听finalValues的四个value,任意一个发生改变，就更新cityPickerdata
      * 
      */
    watch([
      () => finalValues.province,
      () => finalValues.city,
      () => finalValues.area,
      () => finalValues.street,
    ],([province,city,area,street]) => {
      emit("update:cityPickerdata",finalValues)
    }),

    onMounted(() => {
      getProvince()
    })
    

    return {
      data,finalValues,
      getProvince,handerProvince,handerCity,handerArea,handerStreet,result

    }
  }
}
</script>
<style lang="scss" scoped>

</style>