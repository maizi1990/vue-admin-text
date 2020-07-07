<template>
<div>
  <!-- table组件 -->
  <el-table  border style="width: 100%"  
    :data="data.tableData" 
    @selection-change="handleSelectionChange" >
    <!-- 多选列 -->
    <el-table-column
      v-if="data.configTable.selection"
      type="selection"
      width="50">
    </el-table-column>
    <!-- 多选列 END-->
    <!-- 数据列 -->
    <template v-for="item in data.configTable.tHead">
      <!-- 插槽列------禁止启用状态 -->
      <el-table-column  v-if="item.columnType==='slot'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 插槽列------禁止启用状态END -->
      <!-- 基础数据列 -->
      <el-table-column  v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
      </el-table-column>
    </template>
    <!-- 数据列 END-->
  </el-table>
  <!-- 底部 footer -->
  <div class="table-footer">
    <el-row>
      <!-- 批量删除按钮 占位 -->
      <el-col :span="4">
        <slot name="deleteMany"></slot>
      </el-col>
      <el-col :span="20">
        <!-- 分页 -->
        <div class="block pull-right" v-if="data.configTable.pagination.isShow">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="pageData.pageSizes" 
            :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script>
import {ref,reactive,watch, onMounted, onBeforeUpdate, onBeforeMount} from '@vue/composition-api';
import {getData} from './getData.js'   //请求数据
import {paginationHook} from './paginationHook'   //翻页
export default {
  //props接收传过来的参数
  props:{
    configTable:{
      type:Object,
      default:() => {}
    },
    tableRow:{
      type:Object,
      default:() => {}
    },
  },
  
  setup(props,{root,emit}){
    
    const data = reactive({
        //配置参数，初次定义
        configTable:{
          selection:false,
          requestData:{},//数据初始化被赋值---请求接口的配置信息
          tHead:[],//表头配置，通过props过来的configHead赋值
          //页码配置
          pagination:{
            //isShow:true, //是否显示
          }
        },
        tableData:[],//表格数据

    })
    
    //请求表格数据
    const {tableData,getTableData} = getData();   
    //翻页
    const {pageData,handleSizeChange,handleCurrentChange} = paginationHook();   

   //监听数据
   watch([
      () => tableData.item,
      () => tableData.total
   ],([tableData,total]) => {
      data.tableData= tableData    //表格数据
      pageData.total= total //每页条数---更改条数,需要重新请求数据

   })
   //监听页码(监测pageSize和currentPage,任何一个发生改变,都请求接口)
    watch([
      () => pageData.pageSize,
      () => pageData.currentPage
    ],([pageSize,currentPage]) => {
      console.log(pageSize,currentPage);
      
      //重新请求接口
      
      console.log(111,JSON.parse(JSON.stringify(data.configTable)));
      console.log(111,JSON.parse(JSON.stringify(props.configTable)));
      // if(requestData.data) {
      //       requestData.data.pageNumber = currentPage;
      //       requestData.data.pageSize = pageSize;
      //       getTableData(data.configTable.requestData);
      // }


    })

    
   
    /**
     * methods
     */
    
    /**
     * 初始化table配置项
     */
    const initTableConfig = () => {
      let configTable = props.configTable;
      for(let key in configTable){
        if(data.configTable[key] !== undefined){
          data.configTable[key]=configTable[key]; //依次赋值
        }  
      }
    }
    /**全选 事件
     */
    const handleSelectionChange = (data) => {
      //console.log(data); //选中的一行或多行数据
      let tableRow={
        id:data.map(e => e.id)
      }
      emit("update:tableRow",tableRow)
    } 
    /**
     * 刷新表格数据
     */
    const refreshTable = () => {
      // 显示列表数据
      const requestData = data.configTable.requestData;
      getTableData(requestData);
    }
        
    /**
     * 挂载完成前--处理props接受的数据、
     */
    onBeforeUpdate(() => {
        //挪出来,竟然没了死循环
    })

    onBeforeMount(() => {
      // 初始化configTable配置项
      initTableConfig();
      // 显示列表数据
      const requestData = data.configTable.requestData;
      getTableData(requestData);
    })
    

    return {
      data,
      pageData,handleSizeChange,handleCurrentChange,handleSelectionChange,refreshTable
    }
  }
}
</script>
<style lang="scss" scoped>

</style>