<template>
  <div class="about">
    <el-container style="height: 100%">
      <el-aside width="200px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :router="true"
        >
          <el-menu-item index="/about/NewClass">
            <i class="el-icon-location"></i>
            <span slot="title">新建课程</span>
          </el-menu-item>
          <el-menu-item index="/about/NewClassTime">
            <i class="el-icon-menu"></i>
            <span slot="title">新建课时</span>
          </el-menu-item>
          <el-menu-item index="/about/NewTeach">
            <i class="el-icon-document"></i>
            <span slot="title">新建教案</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
          style="
            overflow: hidden;
            display: flex;
            justify-content: space-between;
          "
        >
          <div>
            <i
              @click="isCollapse = !isCollapse"
              :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
              style="padding: 0 20px"
            ></i>
            <h1 style="display: inline-block">欢迎使用菁瑞优智教案管理系统</h1>
          </div>
          <div>
            <el-button type="info" icon="el-icon-s-custom" circle></el-button>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="less" scoped>
h1 {
  padding: 0;
  margin: 0;
}

.about {
  height: 100%;
}

// 布局
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  text-align: left;
  background-color: unset;
}
.el-aside {
  color: #333;
  text-align: center;
  width: auto !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// 导航菜单
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>