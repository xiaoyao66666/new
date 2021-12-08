<template>
  <div class="home">
    <div class="login-wrapper">
      <div class="login-box">
        <h1>登录</h1>
        <el-form
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="账号"
            prop="telephone"
            :rules="[{ required: true, message: '账号不能为空' }]"
          >
            <el-input
              type="username"
              v-model="numberValidateForm.telephone"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="密码"
            prop="password"
            :rules="[{ required: true, message: '密码不能为空' }]"
          >
            <el-input
              type="password"
              v-model.number="numberValidateForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('numberValidateForm')"
              v-loading.fullscreen.lock="fullscreenLoading"
              >提交</el-button
            >
            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-box1">
        <h1>管理系统登录</h1>
        <p>欢迎使用后台管理系统</p>
        <p>@JavaScript</p>
        <p>@Vue</p>
        <p>@Python</p>
        <p>@BootStrap</p>
        <p>还没有账号？<a href="#">立即注册</a></p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.el-form-item__label {
  color: #fff !important;
}

.home {
  background: url(../assets/bg6.jpg) no-repeat center/cover;
  width: 100%;
  height: 100%;
}
.login-wrapper {
  position: relative;
  width: 800px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  .login-box1 {
    position: absolute;
    top: 30%;
    left: 0;
    color: #fff;
    text-align: left;
    p:last-child {
      a {
        color: #0080ff;
        text-decoration: none;
      }
    }
    h1 {
      margin-top: 0;
    }
  }
}
.login-wrapper::after {
  content: "©2021 QianDuan ";
  text-align: left;
  position: absolute;
  width: 800px;
  height: 1px;
  border-bottom: 1px solid #fff;
  bottom: 30%;
  left: 0;
  color: #fff;
}
.login-box {
  position: absolute;
  top: 30%;
  right: 0;
  border: 1px solid #fff;
  border-radius: 5px;
  padding-right: 100px;
  background-color: rgba(255, 255, 255, 0.1);
  h1 {
    box-sizing: border-box;
    padding-left: 100px;
    color: #fff;
  }
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { API } from "../api/api";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      numberValidateForm: {
        telephone: "",
        password: "",
      },
      fullscreenLoading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          API.user_login({ data: this.numberValidateForm }).then((e) => {
            console.log(e);
            if (e.data.code === 0) {
              localStorage.setItem("token",e.data.data)
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 1500);
              setTimeout(() => {
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });
                this.$router.push({ name: 'About' })
              }, 2000);
              return;
            } else {
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 1500);
              setTimeout(() => {
                this.$message({
                  showClose: true,
                  message: e.data.msg,
                  type: "error",
                });
              }, 2000);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
