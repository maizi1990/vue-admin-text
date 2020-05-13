<template>
<div>
<el-form>
  <el-row :gutter="10">
    <el-col :span="4">
      <el-form-item label="类型">
        <el-select v-model="typeValue"  style="width:106px">
          <el-option
            v-for="item in typeOptions.list"
            :key="item.id"
            :label="item.category_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="日期">
        <el-date-picker 
          v-model="detaRangeValue"
          format="yyyy年MM月dd"
          value-format="yyyy-MM-dd"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" style="width:280px">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="关键字">
        <el-select v-model="keyValue" style="width:90px">
          <el-option
            v-for="item in keyWords"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item>
        <el-input v-model="txt" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="2">
      <el-form-item>
        <el-button type="danger" size="medium" @click="search">搜索</el-button>
      </el-form-item>
    </el-col>
    <el-col :span="2">
      <el-form-item>
        <el-button type="success" size="medium" @click="add">新增</el-button>
      </el-form-item>
    </el-col>
  </el-row>
</el-form> 
<!-- 表格  -->
  <el-table
    :data="tableData.item" 
    v-loading="loading" element-loading-text="拼命加载中"
    border  @selection-change="handleSelectionChange"
    style="width: 100%;">
    <!-- 全选 -->
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="340" >
    </el-table-column>
    <el-table-column
      prop="categoryId"
      :formatter="toCategory"
      label="类别"
      width="100">
    </el-table-column>
    <el-table-column
      prop="createDate"
      :formatter="toDate"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user"
      label="管理人"
      width="80">
    </el-table-column>
    <el-table-column
      label="操作" >
      <template slot-scope="scope">
        <el-button type="danger" size="small" 
        @click="deleteItem(scope.row.id)">删除</el-button>
        <el-button type="success" size="small" @click="edit(scope.row.id)">编辑</el-button>
        
       
        <router-link class="margin-left-10"
        :to="{name:'Details',query:{id:scope.row.id,title:scope.row.title}}" 
        > <el-button type="success" size="small" >编辑详情</el-button>
        </router-link>

        <!-- <router-link 
        :to="{path:`/details/${scope.row.id}`}">
          <el-button type="success" size="small" >编辑详情</el-button>
        </router-link>  -->
      </template>
    </el-table-column> 
  </el-table>
<!-- 底部页码 -->
<el-row>
  <el-col :span="12">
    <el-button @click="deleteAll">批量删除</el-button>
  </el-col>
  <el-col :span="12">
    <el-pagination
      background
      layout="prev, pager, next,sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10,5]"
      :total="totalPages">
    </el-pagination>
  </el-col>
</el-row>
<!-- 弹窗组件 -->
<!-- 新增 弹窗 -->
<AddDialog  ref="dialog" :categroyList="typeOptions.list" />
<!-- 编辑 弹窗 -->
<EditDialog  ref="dialogEdit" :editId="editId"
:categroyList="typeOptions.list" />
 <!-- @getListEmit="getList"  -->
</div>
</template>
<script>
import {ref,reactive,watch, onMounted} from '@vue/composition-api';
import AddDialog from "./dialog/AddDialog";
import EditDialog from "./dialog/EditDialog";
import {GetList,DeleteInfo} from  "@/api/news.js";
import {GetCategory} from  "@/api/info.js";
import {global} from "../../utils/global.js"
import {common} from "@/api/common";
import {timesToDate} from "../../utils/common.js"
export default {
components:{
  AddDialog,EditDialog
},
setup(props,{root,refs}){
  const keyWords = reactive([{
      value: 'title',
      label: '标题'
    }, {
      value: 'id',
      label: 'ID'
    }])
  const pickerOptions = reactive({
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      })
  
  const typeValue=ref('')
  const keyValue = ref('ID')
  const dateValue=ref('')        //表格--日期显示
  const detaRangeValue = ref('') //查询条件--日期区间
  const txt = ref('') 
  const {confirm} = global();
  const totalPages = ref(0);
  const loading = ref('false');
  const editId = ref('');//编辑的id
  //reactive
  //类型下拉列表
  const typeOptions = reactive({
    list:[]
  })
  //表格数据
  const tableData = reactive({
    item:[]
  })
  //页码
  const pageInfo =reactive({
    pageNumber:1,//当前所在页
    pageSize:10,//每页条数，默认10
  })
  //删除的 id(数组格式)
  const deleteId = reactive({
    item:[]
  })
  /**
   * *************watch**************获取分类信息列表
   */
  const {categroyList,getCategory} = common();
  //监听 categroyList.list 的改变
  watch(() => categroyList.list,(value) => {
    typeOptions.list = value;
  })

  /**
   * **************生命周期**************************
   */
  onMounted(() => {
    getList();//获取信息列表
    getCategory();//获取类型下拉列表
  })
  /**
   * **************methods**************************
   */
  /**
   * 编辑详情
   */
  const editDetails = () => {
    
    console.log(1)
  }
    /**
   * 搜索
   */
  const search = () => {
    const requestData = formatData();
    //console.log(requestData);
    //获取列表
    getList();
  }
  /**
   * 搜索列表--字段信息处理
   */
  const formatData = () => {
    const requestData = {
      pageNumber: pageInfo.pageNumber,//当前页码
      pageSize: pageInfo.pageSize, //每页条数
    }
    //类型、分类
    if(typeValue.value){
      requestData.categoryId = typeValue.value;
    }
    //日期
    if(detaRangeValue.value){
      requestData.startTiem = detaRangeValue.value[0];
      requestData.endTime = detaRangeValue.value[1];
    }
    //关键字
    if(keyValue.value){
      requestData[keyValue.value] = txt.value;
    }
    return requestData;
  }
  /**
   * 获取列表
   */
  const getList = () => {
    loading.value = true;
    const requestData=formatData();
    GetList(requestData).then((result) => {
      //表格数据
      tableData.item =result.data.data.data;
      totalPages.value = result.data.data.total;
      let resCode = result.data.resCode;
      loading.value = false;
      //console.log(result.data);
    }).catch((err) => {
      
    });
  }

  /**
   * 新增一条信息
   */
  const add = () => {
    refs.dialog.dialogFormVisible =true;
  }
  /**
   * 编辑
   */
  const edit = (id) => {
    refs.dialogEdit.dialogFormVisible =true;
    editId.value = id;
  }
  /**
   * 改变每页条数
   */
  const handleSizeChange = (val) => {
    pageInfo.pageSize  = val;
    getList();//改变每页条数，重新渲染列表页
  }
  /**
   * 切换页码
   */
  const handleCurrentChange = (val) => {
    pageInfo.pageNumber = val;
    getList();//改变页码，重新渲染列表页
  }
  /**
   * 时间戳转日期
   */
  const toDate = (row)=> {
    let time = row.createDate;
    return timesToDate(time)
  }
  /**
   * 类型id 转类型名称---根据id过滤出新数组
   */
  const toCategory = (row) => {
    const len = typeOptions.list.length;
    if(len>0){
      const findList=typeOptions.list.filter((e) => {
        return e.id===row.categoryId;
      })
      if(findList.length){
        return findList[0].category_name;
      }
      
    }
    
  }
  /**
   * 点击“删除”按钮
   */
  const deleteItem = (id) => {
    console.log(id);
    confirm({
      tipsTxt:"确定删除这一条信息吗",
      type:"success",
      fn:confirmDelete,//点击“确认”，执行此函数
      id:id,
      //catchFn:
    })
  }
  /**
   * 点击 “批量删除” 按钮
   */
  const deleteAll = () => {
    if(deleteId.item.length==0){
      root.$message({
        type:"error",
        message:"请选择要删除的内容！"
      })
      return false;
    }
    confirm({
      tipsTxt:"确定批量删除吗，此操作不可恢复！",
      type:"success",
      fn:confirmDelete,
      id:deleteId.item,
    })
  }
  /**
   * 全选，多选（删除）
   */
  const handleSelectionChange = (val) => {
    
    deleteId.item = val.map(e => e.id)
    //console.log(deleteId.value);
  }
  /**
   * 是否删除弹框 =》点击“确认”按钮
   */
  const confirmDelete = (id) => {  //该id是在global里边传进去的
    //删除一条，id是数值；批量删除，id是数组
    if(id instanceof Array){
      deleteId.item  = id;
    }else{
      deleteId.item = [id];
    }
    const requestData = {
      id:deleteId.item
    }
    DeleteInfo(requestData).then((result) => {
     // console.log(result);
      const {resCode,message} = result.data;
      if(resCode===0){
        deleteId.item=[];//置空
        getList();
        
      } 
    }).catch((err) => {
      
    });
  }

  
  
  return {
    //ref
    typeValue,keyWords,keyValue,dateValue,txt,totalPages,loading,detaRangeValue,editId,
    //reactive
    tableData,pickerOptions,typeOptions,deleteId,
    //methods
    add,deleteItem,deleteAll,confirmDelete,handleSizeChange,handleCurrentChange,toDate,toCategory,handleSelectionChange,search,edit,editDetails,
  }
}
}
</script>
<style lang="scss" scoped>

</style>