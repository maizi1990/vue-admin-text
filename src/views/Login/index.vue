<template>
  <div id="login">1
    <div class="login-wrap">
     
      <ul class="menu-tab">
        <li v-for="(item,index) in menuTab" :key="index" 
        :class="{'current':item.current}" 
        @click="toggleMenu(item)">
          {{item.txt}}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" size="medium" ref="ruleForm"  class="login-form">
        <el-form-item prop="username" class="item-form">
          <label>用户名</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="password2" class="item-form" v-show="model==='register'">
          <label>确认密码</label>
          <el-input type="" v-model="ruleForm.password2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="item-form">
          <label >验证码</label>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="ruleForm.code"  minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block" @click="getSms" :disabled="getCodeBtn.state">{{getCodeBtn.txt}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-form">
          <el-button type="primary" class="block" :disabled="loginBtnState"
          @click="submitForm('ruleForm')">
            {{model==='register' ? '注册' : '登录'}}
          </el-button>
        </el-form-item>
      </el-form>
     
    </div>   
  </div>
</template>
<script>
import sha1 from 'js-sha1'
import { GetSms,Register,Login } from '@/api/login';
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate.js';
import { reactive,ref, onMounted, set } from '@vue/composition-api';

export default {
  setup(props,{root,refs}){
   

    /* 表单input的验证---验证规则提示 */
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value=='') {
        callback(new Error('用户名不能为空'));
      }else if(validateEmail(value)){
        callback(new Error('用户名需要邮箱格式'))
      }else{
        callback()
      }
    }
    //验证密码
    let validatePassword = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.password = stripscript(value);
      value = stripscript(value);
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }else if(validatePass(value)){
        callback(new Error('密码需要是6至20位的字母+数字'));
      }{
        callback()
      }
    }
    //验证密码2
    let validatePassword2 = (rule, value, callback) => {
      //如果是登录模块  不用验证密码2
      if(model.value === 'login'){callback()}
      //如果是注册模块  验证密码2
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    //验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else if (validateVCode(value)){
        callback(new Error('验证码为6位数字或字母!'));
      } else {
        callback();
      }
    }
    //data基础数据
    const model = ref('login');
    //登录按钮默认是禁用
    const loginBtnState = ref(true);
    //定义 定时器
    const timer = ref(null);
    /*
    data复杂数据 
    */
    //登录、注册按钮状态
    const menuTab = reactive([
      {txt:"登录",current: true, type: 'login'},
      {txt:"注册",current: false, type: 'register'}
    ])
    //获取验证码 状态
    const getCodeBtn = reactive({txt:'获取验证码',state:false})
    const ruleForm = reactive({
      username: '666666@qq.com',
      password: 'maizi1990',
      password2: 'maizi1990',
      code:''
    })
    const rules = reactive({
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      password2: [
        { validator: validatePassword2, trigger: 'blur' }
      ],
      code: [
        { validator: validateCode, trigger: 'blur' }
      ],
    })
   
    /* 
    定义事件处理函数
    */
    /*
    切换tab
    */
    const toggleMenu = (item) => {
      menuTab.forEach((e) => {
        e.current=false;
      })
      item.current=true;//当前高亮
      model.value = item.type;//显隐-确认密码
      //console.log(ruleForm);
      resetForm('ruleForm')
    }
    /*
    注册和登录 获取验证码
    */
    const getSms = () => {
      const requestData = {
        username: ruleForm.username,
        module: model.value
      }
      //用户名为空---提示
      if(ruleForm.username===''){
        root.$message.error('邮箱不能为空！')
        return false;
      }
      //用户名格式错误---提示
      if(!validateVCode(ruleForm.username)){
        root.$message.error('请输入正确的邮箱格式！')
        return false;
      }

      GetSms(requestData).then(response => {
        const {resCode,message} = response.data;
        if(resCode===0){
          root.$message({
            message:message,
            type:'success'
          })
        }
        
        //登录注册按钮-可点击
        loginBtnState.value = false;
        //倒计时开始
        countDown(60)
        //获取验证码-不可点击
        getCodeBtn.state = true;



      }).catch(error => {
        console.log(error);
      })
      
    }
    /**
     * 倒计时
     */
    const countDown = (num) =>{
      //防止按钮不停的点击 定时器越来越快
      if(timer.value){
        clearInterval(timer.value);
      }
      timer.value = setInterval(() => {
        num--;
        if(num===0){
          //清除 定时器
          clearInterval(timer.value);
          getCodeBtn.txt=`再次获取`;
          getCodeBtn.state=false;
        }else{
          getCodeBtn.txt=`倒计时${num}秒`;
          getCodeBtn.state=true;
        }
      },1000)
    }
    /**
     * 关闭倒计时
     */
    const clearCountDown = () => {
      getCodeBtn.txt=`获取验证码`;
      getCodeBtn.state=false;
      //清除定时器
      clearInterval(timer.value);
    }
    /*
    重置表单
    */
    const resetForm = (ruleForm) => {
      refs[ruleForm].resetFields();
    }
    /*
    提交表单
    */
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          model.value==='login' ? login() : register();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    /**
     * 注册
     */
    const register = () => {
      const requestData ={
        username:ruleForm.username,
        password:sha1(ruleForm.password),
        code:ruleForm.code
      }
      //注册接口
      Register(requestData).then((response) => {
        console.log(response.data);
        const message = response.data.message;
        if(resCode===0){
          root.$message({
          type:'success',
          message:message
        })
        }
        
        //注册成功后——1、切换登录  
        toggleMenu(menuTab[0]);
        //2、关闭倒计时
        clearCountDown();

      }).catch((error) => {

      })
    }
    /**
     * 登录
     */
    const login = () => {
      const requestData = {
        username:ruleForm.username,
        password:sha1(ruleForm.password),
        code:ruleForm.code
      }
      
      root.$store.dispatch("app/login",requestData).then(response => {
        root.$router.push("/console")
      })


      //2、关闭倒计时
      clearCountDown();
      

    }
    /**
     * 生命周期
     */
    //挂载完成后
    onMounted(() => {
    })


    /*把上面data,方法都return出去*/
    return {
      menuTab,
      model,
      loginBtnState,
      getCodeBtn,
      timer,
      ruleForm,
      rules,
      toggleMenu,
      getSms,
      submitForm,
      
      
    }
      


    
    

  },


    
}
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, .1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form { margin-bottom: 13px; }
  .block {
    display: block;
    width: 100%;
    text-align: center;
  }
  .login-btn { margin-top: 19px; }
}
</style>
