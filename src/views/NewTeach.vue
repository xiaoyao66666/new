<template>
  <el-row style="background-color: #fff">
    <el-col :span="12">
      <div style="overflow: hidden">
        <div style="float: left">
          <el-select v-model="value" clearable placeholder="请选择课程类型">
            <el-option
              v-for="item of className"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="div1"></div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
  </el-row>
</template>

<style lang="less" scoped>
/deep/.w-e-text-container {
  z-index: unset !important;
}
/deep/.w-e-toolbar {
  z-index: unset !important;
}
</style>

<script>
import E from "wangeditor";
import { API } from "../api/api";

export default {
  data() {
    return {
      className: {},
      value: "",
    };
  },
  mounted() {
    const editor = new E("#div1");
    editor.create();
    API.get_period1().then((e) => {
      if (e.data.code === 0) {
        this.className = e.data.data;
        console.log(this.className);
      }
    });
  },
};
</script>