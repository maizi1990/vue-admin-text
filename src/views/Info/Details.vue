<template>
  <div>
    <el-form :model="form"  ref="form" label-width="120px" class="demo-form">
      
      <el-form-item label="信息分类" >
        <el-select v-model="form.categoryId" >
          <el-option  v-for="item in data.category" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" >
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker disabled
          v-model="form.createDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="内容">
        <quillEditor v-model="form.content"  
        ref="myQuillEditor" :options="data.editorOption"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import {GetList,EditInfo} from "@/api/news.js";
import {ref,reactive,watch, onMounted} from '@vue/composition-api';
import {common} from "@/api/common";
import {timesToDate} from "../../utils/common.js"
//富文本编辑器
import {quillEditor} from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: "Details",
  components: { quillEditor,  },
  setup(props,{root}){
    /**
     * 所有参数放在data里边 ，不用一个个return
     */

    const data = reactive({
      id:root.$route.query.id,//路由传递过来的参数  id、title
      title:root.$route.query.title,
      category:[],//下拉列表
      editorOption:{},//富文本编辑器
    })
    const form=reactive({
      categoryId: '',//类名id
      title:'',//标题
      createDate:'',//日期
      content:'',//内容
      
    })



    const {categroyList,getCategory} = common();
    watch(() => categroyList.list,(value) => {
      data.category = value;
    })
    onMounted(() => {
      getCategory();//获取类型下拉列表
      getEditItem();
    })
    /**
     * 获取所编辑的item
     */
    const getEditItem = () => {
      let reqestData = {
        id:data.id,
        pageNumber: 1,
        pageSize: 1
      }
      GetList(reqestData).then((result) => {
        const data = result.data.data.data[0];
        console.log(data);
        const resCode = result.data;
        form.categoryId=data.categoryId;
        form.title=data.title;
        form.createDate=timesToDate(data.createDate);
        form.content =data.content;
        console.log(form);
    
      }).catch((err) => {
    
      });
    }
    const submit = () => {
      let reqestData ={
        id:data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
      }
      if(!form.content){
        root.$message({
          type:"error",
          message:'内容不能为空！'
        })
        return false
      }
      EditInfo(reqestData).then((result) => {
        const {resCode,message} = result.data;
        console.log(result.data);
       //resetForm('form');//重置表单
        if(resCode===0){
          root.$message({
            type:"success",
            message:message
          })
        }
        /**
         * 两种修改数据显示的方法：
         * 1、暴力刷新--调用父组件的方法
         * 2、手动修改标题,但是日期那里没法改。可根据业务需求来做
         */
        //emit("getListEmit");   //莫名其妙报错
      
        
      }).catch((err) => {
        
      });
    }

    return {
      data,form,
      getEditItem,submit,

    }
  }
}
</script>
<style lang="scss" scoped>

</style>