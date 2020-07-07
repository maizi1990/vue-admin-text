<template>
  <div>
  <el-form>
    <el-row  :gutter="20">
      <!-- 左侧 -->
      <el-col :span="7">
        <el-form-item label="关键字">
          <!-- 引入select组件 -->
          <selectVue :options="data.options"  />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="">
          <el-input v-model="data.searchTxt" placeholder="输入要查询的内容" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="6">
        <el-form-item>
          <el-button type="danger" class="pull-right" @click="addUser">新增用户</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- table组件 -->
  <tableVue ref="userTable"
  :configTable="data.configTable"  :tableRow.sync="data.tableRow">
    <!-- 插槽01--------------禁止状态-------------- -->
    <template  slot="status" slot-scope="scope">
      <!-- 
        v-slot:status="item"              //简写
        slot="status" slot-scope="scope"  //常规写法
      -->   
        <el-switch 
          v-model="scope.data.status"
          active-color="#13ce66"    active-value="1"
          inactive-color="#ff4949"  inactive-value="2" >
        </el-switch>
    </template>
    <!-- 插槽02-------------------操作 --------------------->
    <template slot="operation"  slot-scope="scope" >
      <el-button type="danger" size="mini" @click="editItem(scope.data)">编辑11</el-button>
      <el-button type="success" size="mini" @click="deletOne(scope)">删除</el-button>
    </template>
    <!-- 插槽03  批量删除 -->
    <template  slot="deleteMany">
      <el-button type="danger" @click="deletMany()">批量删除</el-button>
    </template>
    
  </tableVue>
  <!-- dialog组件 -->
  <AddDialog ref="dialog" ></AddDialog>
  </div>
</template>
<script>
import AddDialog from "./dialog/AddDialog";
import selectVue from "@/components/select";
import tableVue from "@/components/table";
import { global } from "@/utils/global.js";
import {ref,reactive,watch, onMounted} from '@vue/composition-api';

//接口
import {UserDelete} from "@/api/user.js"

export default {
  components:{
    selectVue,
    tableVue,
    AddDialog
  },
  setup(props,{root,refs}){
    const data = reactive({
      /**
       * table组件配置参数
       */
      configTable:{
        //全选
        selection:true,
        //请求接口的data
        requestData:{
          url:"/user/getList/",  //请求接口地址
          method:"post",   //请求方式
          data: {
              pageNumber: 1,//页码
              pageSize: 5  //条数
          }//传参
        },
        //表头配置
        tHead:[
          {
            prop:"username",
            label:"用户名",
            width:160,
          },
          {
            prop:"truename",
            label:"姓名",
            width:100,
          },
          {
            prop:"phone",
            label:"手机号",
            width:100,
          },
          {
            prop:"role",
            label:"角色",
            width:100,
          },
          {
            prop:"status",
            label:"禁启用",
            columnType:"slot",//区分 基础数据渲染 和 插槽渲染
            slotName:"status",//具名插槽的名字
            width:100,
          },
          {
            prop:"operation",
            label:"操作",
            columnType:"slot",//区分 基础数据渲染 和 插槽渲染
            slotName:"operation",//操作
          }
        ],
        //页码配置
        pagination:{
          isShow:true, //是否显示

        }
      },
      /**
       * select选项配置参数
       */
      configOptions:['id','title'],//配置参数
      keyWord:"",//v-model
      searchTxt:'',//搜索关键字
      options:[{
        value: 'title',
        label: '标题'
      }, {
        value: 'id',
        label: 'ID'
      }],
      /**
       * 选择单行/多行数据
       */
      tableRow:{}
    })
    //是否确认删除
    const {confirm} = global()
    /**
     * methods
     */
    const editItem = (a) => {
      //console.log(a);
    }
    /**
     * 新增用户
     */
    const addUser = () => {
      refs.dialog.dialogFormVisible = true
    }
    /**
     * 点击批量删除
     */
    const deletMany = () => {
      let requestData = data.tableRow;
      //是否删除-确认、取消
      confirm({
        tipsTxt:"确定删除吗",
        type:"success",
        fn:userDelete,//点击“确认”，执行此函数
        id:requestData,
      })
      
    }
    /**
    * 删除 当前行
     */
    const deletOne = (data) => {
      
      const requestData = data.tableRow = {
        id:[data.data.id]
      }
      //是否删除-确认、取消
      confirm({
        tipsTxt:"确定删除该用户吗",
        type:"success",
        fn:userDelete,//点击“确认”，执行此函数
        id:requestData,
      })

    }

    /**
     * 删除用户接口
     */
    const userDelete = (requestData) => {
      UserDelete(requestData).then((result) => {
        let {resCode,message} = result.data
        //刷新表格数据
        refs.userTable.refreshTable()
      }).catch((err) => {
        
      });
    }
    /**
     * 生命周期钩子函数
     */
    onMounted(() =>{
      
    })

   
    return {
      data,
      editItem,addUser,deletMany,userDelete,deletOne
    }
  }
}
</script>
<style lang="scss" scoped>
.headLeft{
     background: red;
   }
   .headRight{
     background: blue;
   }
</style>