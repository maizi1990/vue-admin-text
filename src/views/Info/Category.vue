<template>
<div id="category">
  <el-button type="danger" @click="addFirst">添加一级分类</el-button>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="category" v-for="item in categoryList.list" :key="item.id" >
          <h4>
            <svg-icon icon-class="plus"></svg-icon>
            {{item.category_name}}
            <div class="btn-group">
              <el-button type="success" round size="mini" 
              @click="editCategory({categoryName:item.category_name,type:'1',id:item.id})">编辑</el-button>
              <el-button type="danger" round size="mini" @click="deleteConfirm(item.id)">删除</el-button>
              <el-button round size="mini" @click="addChild(item)">添加子集</el-button>
            </div>
          </h4>
          <ul>
            <li v-for="childItem in item.children" :key="childItem.id">{{childItem.category_name}}
              <div class="btn-group">
                <el-button type="success" round size="mini">编辑</el-button>
                <el-button type="danger" round size="mini">删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="12">
        <div class="edit">
          <h4>一级分类编辑</h4>
          <el-form label-width="120px" :model="form" ref="form">
            <el-form-item label="一级分类名称" v-if="isShowFirst" prop="firstCategroyName">
              <el-input v-model="form.firstCategroyName" :disabled="firstCategroyDisabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称"  v-if="isShowSecond" prop="secondCategroyName">
              <el-input v-model="form.secondCategroyName" :disabled="secondCategroyDisabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="submit" :loading="loading" :disabled="btnDisabled">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script>
import {common} from "@/api/common";
import {AddFirstCategory,DeleteCategory,EditCategory,AddChildrenCategory} from "@/api/info.js";
import {global} from "@/utils/global.js";
import {ref,reactive,onMounted,watch} from "@vue/composition-api";
export default {
setup(props,{root,refs}){
  /**
   * ref
   */
  const isShowFirst = ref(true)
  const isShowSecond = ref(true)
  const loading = ref(false)
  const firstCategroyDisabled = ref(true)
  const secondCategroyDisabled = ref(true)
  const btnDisabled = ref(true)
  const deleteId = ref()
  const editId = ref();//添加子级分类时候，父级的id
  const type = ref('0');//点击“确定”按钮   '0'添加一级   '1'编辑一级  '2'添加二级 
  const id = ref('')  
  const {confirm} = global();
  
  /**
   * reactive
   */
  const form = reactive({
    firstCategroyName: '',
    secondCategroyName: '',
  })
  const categoryList = reactive({
    list:[]
  })
  /**
   * *************watch**************
   */
  const {categroyList,getCategory,getCategoryAll } = common();
  //获取分类信息列表--------监听 categroyList.list 的改变
  watch(() => categroyList.list,(value,oldvalue) => {
    console.log(value,oldvalue);
    categoryList.list = value;
  })

  /**
   * **********************生命周期函数******************
   */
  onMounted(() => {
    //getCategory();
    getCategoryAll();
  })
  /**
   * ********************methods********************
   */
 
  /**
   * 编辑一级分类名称
   */
  const editCategory =  (data) => {
    isShowSecond.value = false;//隐藏二级分类输入框
    firstCategroyDisabled.value = btnDisabled.value = false;//可点击
    console.log(data);
    form.firstCategroyName = data.categoryName;
    type.value = data.type
    id.value = data.id

  }
  /**
   * 点击 添加一级分类 按钮
   */
  const addFirst = () => {
    isShowSecond.value = false;//隐藏二级分类输入框
    firstCategroyDisabled.value = btnDisabled.value = false;//可点击
  }
   /**
   * 点击 添加子级 按钮
   */
  const addChild = (item) => {
    isShowSecond.value = true;//显示二级分类输入框
    secondCategroyDisabled.value =btnDisabled.value =false;//可点击
    type.value = '2';
    form.firstCategroyName = item.category_name;
    editId.value = item.id;
  }
  const addChildrenCategory = () => {
    if(form.secondCategroyName===''){
      root.$message({
        message:'二级分类名字不能为空!',
        type:"error"
      })
      return false;  //阻止后续程序运行
    }
    const requestData ={
      categoryName:form.secondCategroyName,
      parentId:editId.value
    }
    //二级类名不为空，才可以调取接口
    if(form.secondCategroyName!==''){
      AddChildrenCategory(requestData).then((result) => {
        /**
         * 方法一：暴力刷新
         * getCategoryAll();
         */
        
        /**
         * 方法二：向数据列表插入数据-这个性能好
         */
        const childrenData = result.data.data;
        const index = categoryList.list.findIndex(e => {
          return e.id === editId.value;
        })
        categoryList.list[index].children.push(childrenData)
        form.secondCategroyName=""
        
        console.log(categoryList.list);
      }).catch((err) => {
        
      });
    }
  }
 
  /**
   * 点击 确定 按钮
   */
  const submit = () => {
    //添加一级分类
    if(type.value == '0'){addCategroy()}
    //编辑一级分类
    if(type.value == '1'){editFitstCategroy()}
    //添加二级分类
    if(type.value == '2'){addChildrenCategory()}
  }
  /**
   * 点击 确定 按钮,添加一级分类名称
   */
  const addCategroy = () => {
    console.log(type.value);
    loading.value= true;
    if(form.firstCategroyName!==''){
      let categoryName = form.firstCategroyName;
      //调接口---添加一级分类
      AddFirstCategory({categoryName:categoryName}).then((result) => {
        let data= result.data;
        let {resCode,message,data:newData}  = data;
        if(resCode===0){
          root.$message({
            message: '一级分类名称添加成功！',
            type: 'success'
          });
        }
        categoryList.list.push(newData)
        loading.value = false;
        refs['form'].resetFields();//重置input输入框
      }).catch((err) => {
      });
    }else{
      root.$message({
        type:"warning",
        message:"分类名称不能为空"
      })
      loading.value= false;
    }
  }
  /**
   * 点击 确定 按钮,编辑一级分类名称
   */
  const editFitstCategroy = () => {
    //调接口---编辑一级分类
    let requestData = {
      id:id.value,
      categoryName:form.firstCategroyName
    }
    if(form.firstCategroyName===''){
      root.$message({
        type:"waring",
        message:"分类名称不能为空"
      })
      return false;
    }
    EditCategory(requestData).then((result) => {
      console.log(result);
      let resCode = result.data.resCode;
      let newCategoryName = result.data.data.data.categoryName;
      var index = categoryList.list.findIndex((e) => {
        console.log(e);
        return e.id ===id.value
      })
      categoryList.list[index].category_name=newCategoryName;
      if(resCode===0){
        root.$message({
          message: '修改成功！',
          type: 'success'
        });
      }
      form.firstCategroyName='';
      
    }).catch((err) => {
    });
    loading.value= false;
  }
  /**
   * 点击删除---提示 是否确认删除？！
   */
  const deleteConfirm = (categoryId) => {
    confirm({
      tipsTxt:"确认删除这个分类吗？",
      type:"",
      fn:deleteCategory,
      catchFn:() => {
        categoryId==='';
      },
      id:categoryId,//删除的id（传递给fn）
    })
  }
  /**
   * 删除一级分类
   */
  const deleteCategory = (categoryId) => {
    DeleteCategory({categoryId:categoryId}).then((result) => {
      const {resCode,message} = result.data;
      if(resCode===0){
          let index = categoryList.list.findIndex((e) =>{
            return e.id === categoryId;
          })
          categoryList.list.splice(index,1)
      }
      //categoryList.list.splice(id)
    }).catch((err) => {
      
    });
  }

  return {
    //ref
    isShowFirst,isShowSecond,loading,firstCategroyDisabled,secondCategroyDisabled,btnDisabled,type,id,editId,
    //reactive
    form,categoryList,
    //methods
    addFirst,addCategroy,getCategory,deleteCategory,deleteConfirm,editCategory,editFitstCategroy,submit,
    addChildrenCategory,addChild,
  }
}
}
</script>
<style lang="scss" scoped >
@import "../../styles/config.scss";
.category {
  position: relative;
  &:before{
    content:"";
    width:14px;
    position: absolute;
    border-right:1px dotted #000;
    top: 0;
    left:0;
    bottom: 0;
    z-index:2;
  }
  &:first-of-type{
    &:before{
      top:22px;
    }
  }
  &:last-of-type{
    &:before{
      bottom:22px;
    }
  }
  h4{
    position: relative;
    line-height: 40px;
    padding-left: 36px;
    font-weight: bold;
    svg{
      position: absolute;
      fill: #000;
      width: .6em;
      left:9px;
      top: 10px;
      
    }
    
  }
  li{
    position: relative;
    line-height:40px ;
    padding-left: 50px;
    &:before{
      content:"";
      width: 30px;
      border-bottom: 1px dotted #000;
      position: absolute;
      left:15px;
      top:20px;
    }
  }
  h4,li{
    @include webkit(transition, all .5s ease 0s);
    cursor: pointer;
    .btn-group{
      z-index:3;
      display: none;
    }
    &:hover{
      background: #f3f3f3;
      .btn-group{
        display: block;
      }
      
    }
  }
  .btn-group{
    float: right;
    padding-right: 20px;
  }
  
}
.edit {
    h4{
      background: #f3f3f3;
      line-height: 40px;
      padding-left: 20px;
      font-weight: bold;
    }
    .el-form-item{
      margin-top: 20px !important;
      .el-input{
        width: 60%;
      }
    }
  }
</style>