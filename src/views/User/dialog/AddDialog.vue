<template>
  <!-- 新增 弹窗  -->
  <el-dialog title="新增" :visible.sync="dialogFormVisible" @open="openDialog">
    <el-form :model="form" ref="form">
      <!-- 用户名 -->
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <!-- 真实姓名 -->
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="truename">
        <el-input v-model="form.truename" placeholder="请输入真实姓名"  ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <!-- 地区 -->
      <el-form-item label="地区" :label-width="formLabelWidth" prop="region">
          <cityPicker :cityPickerdata.sync="form.region" ></cityPicker>
      </el-form-item>
      <!-- 是否禁用 -->
      <el-form-item label="是否禁用" :label-width="formLabelWidth" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色" :label-width="formLabelWidth" >
        <el-checkbox-group v-model="form.role">
          <el-checkbox v-for="(item,index) in roleList.item" :label="item.role" :key="index">{{item.name}}</el-checkbox>
          
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button  type="danger" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
</template>
<script>
import {GetRole,UserAdd} from "@/api/user.js"
import {ref,reactive, watch} from '@vue/composition-api';
//省市县区 组件
import cityPicker from "@/components/cityPicker";
export default {
  components:{
    cityPicker
  },
  setup(props,{root,refs}){
    const dialogFormVisible = ref(false)
    const formLabelWidth= ref('70px')
    const form = reactive({
      username: '',
      truename: '',
      password:'',
      phone:'',
      region:{},//城市下拉 地区
      status: '1',//禁、启用状态
      role: [],//角色 v-model
    })
    //角色列表
    const roleList = reactive({
      item:[]
    })

    //获取角色
    const getRole = () => {
      GetRole().then((result) => {
        roleList.item=result.data.data
      }).catch((err) => {
        
      });
    }
    /**
     *弹框打开后  
     */
    const openDialog = () => {
      getRole()
    }
    /**
     * 点击 确定 提交
     */
    const submit = () => {
      if(!form.username){
        root.$message({
          type:"error",
          message:'用户名不能为空！'
        })
        return false
      }
      if(!form.password){
        root.$message({
          type:"error",
          message:'密码不能为空！'
        })
        return false
      }
      let requestData = JSON.parse(JSON.stringify(form))  //对象深拷贝，脱离原有指针
      //let requestData = Object.assign({},form)      //浅拷贝，也能脱离原有指针
      requestData.role = requestData.role.join("")
      
      UserAdd(form).then((result) => {
        const responseData = result.data
        const {resCode,message} = responseData
       dialogFormVisible.value = false;//关闭弹窗
        
        if(resCode===0){
          root.$message({
            type:"success",
            message:'用户添加成功！'
          })
        }
        //清空 表单
        resetForm("form")
        //清空 地区
        form.region={}  
        //清空 角色
        form.role=[]

      }).catch((err) => {
        
      });
     
    }
    /**
     * 清空表单
     */
    
    const resetForm = (formName) => {
      refs[formName].resetFields();
    }



    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    

    
    

    

    return {
      //ref
      dialogFormVisible,
      formLabelWidth,
      //reactive
      form,roleList,
      //methods
      openDialog,resetForm,submit,
    }
  }
  
  
}
</script>
<style lang="scss" scoped>

</style>