<template>
  <div id="login">1
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item,index) in menuTab" :key="index" 
        :class="{'current':item.current}" @click="toggleMenu(item)">
          {{item.txt}}</li>
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
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-form">
          <el-button type="primary" class="block" 
          @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>   
  </div>
</template>
<script>
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate.js';
export default {
    data() {
      //验证用户名
      let validateUsername = (rule, value, callback) => {
        if (value=='') {
          callback(new Error('用户名不能为空'));
        }else if(validateEmail(value)){
          callback(new Error('用户名需要邮箱格式'))
        }else{
          callback()
        }
      };
      //验证密码
      let validatePassword = (rule, value, callback) => {
        //过滤特殊字符
        this.ruleForm.password = stripscript(value);
        value = stripscript(value);
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }else if(validatePass(value)){
          callback(new Error('密码需要是6至20位的字母+数字'));
        }{
          callback()
        }
      };
      //验证密码2
      let validatePassword2 = (rule, value, callback) => {
        //如果是登录模块  不用验证密码2
        if(this.model === 'login'){callback()}
        //如果是注册模块  不用验证密码2
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //验证验证码
      let validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'));
        } else if (validateVCode(value)){
          callback(new Error('验证码为6位数字或字母!'));
        } else {
          callback();
        }
      };

      return {
        menuTab:[
          {txt:"登录",current: true, type: 'login'},
          {txt:"注册",current: false, type: 'register'}
        ],
        model:"login",
        ruleForm: {
          username: '123456@qq.com',
          password: 'A123456789',
          password2: 'A123456789',
          code:'666666'
        },
        rules: {
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
        }
        
      };
    },
    methods: {
      toggleMenu(item){
        this.menuTab.forEach((e) => {
          e.current=false;
        })
        item.current=true;//当前高亮
        this.model = item.type;//显隐-确认密码
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
    }
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
