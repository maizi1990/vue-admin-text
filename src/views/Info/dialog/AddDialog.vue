<template>
  <!-- 新增 弹窗  -->
  <el-dialog title="新增" :visible.sync="dialogFormVisible" @open="openDialog">
    <el-form :model="form" ref="form">
      <el-form-item label="类型" :label-width="formLabelWidth" prop="category">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option   
          v-for="item in typeOptions.list"
          :label="item.category_name" 
          :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况" :label-width="formLabelWidth"
      prop="info">
        <el-input type="textarea" v-model="form.info" placeholder="请输入概况"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button  type="danger" @click="submit">确定</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>  
</template>
<script>
import {AddInfo} from "@/api/news.js"
import {ref,reactive, watch} from '@vue/composition-api';
export default {
  props:{
    categroyList:{
      type:Array,
      default:() => []
    },
  },
  setup(props,{root,refs}){
    const dialogFormVisible = ref(false)
    const formLabelWidth= ref('50px')
    const form = reactive({
      title: '',
      category: '',
      info:'',
      resource: '',
    })
    //类型列表
    const typeOptions = reactive({
      list:[]
    })

    /**
     *弹框打开后  
     */
    const openDialog = () => {
      typeOptions.list = props.categroyList
    }
    /**
     * 点击 确定 提交
     */
    const submit = () => {
      let reqestData ={
        category: form.category,
        title: form.title,
        content: form.info,
      }
      if(!form.category){
        root.$message({
          type:"error",
          message:'类型不能为空！'
        })
        return false
      }
      AddInfo(reqestData).then((result) => {
        const {resCode,message} = result.data;
        dialogFormVisible.value=false;
        resetForm('form');//重置表单
        
        if(resCode===0){
          root.$message({
            type:"success",
            message:message
          })
        }
      }).catch((err) => {
        
      });
    }

    /**
     * 点击 取消 按钮
     */
    
    const resetForm = (formName) => {
      console.log(2);
      refs[formName].resetFields();
    }


    return {
      //ref
      dialogFormVisible,
      formLabelWidth,
      //reactive
      form,typeOptions,
      //methods
      openDialog,resetForm,submit,
    }
  }
  
  
}
</script>
<style lang="scss" scoped>

</style>