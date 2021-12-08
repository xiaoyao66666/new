<template>
  <div style="background-color: #fff; padding: 25px">
    <div style="overflow: hidden">
      <div style="float: left">
        <el-select
          v-model="value"
          clearable
          placeholder="请选择"
          @change="getShow(value)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="float: right">
        <create
          :dialogFormVisible="dialogFormVisibles"
          @close="dialogFormVisibles = false"
          :form1="form1"
          :title="title"
          @SuccesState="createclass"
        ></create>
        <el-button
          type="primary"
          @click="
            (dialogFormVisibles = true),
              (form1 = {}),
              (title = '创建课程'),
              (type = true)
          "
          >创建</el-button
        >
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="课程名" width="150">
      </el-table-column>
      <el-table-column prop="id" label="课程编号" width="300">
      </el-table-column>
      <el-table-column prop="describe" label="课程描述" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180">
      </el-table-column>
      <el-table-column prop="show" label="线上线下" width="100">
        <template slot-scope="scope">
          <el-switch
            :value="initialShow(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeShow(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="getInfo(scope.row,'编辑课程')">编辑</el-button>
          <el-button type="text" @click="deleteclass(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-count="pageSize"
      :current-page="currentPage"
      style="padding-top: 25px"
      @next-click="nextClick"
      @prev-click="prevClick"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>



 <script>
import { API } from "../api/api";
import Create from "../components/Create/Create.vue";
import { myMixins } from "../mixins/myMixins";

export default {
  mixins: [myMixins],
  data() {
    return {
      // 查找后页数
      isShow: 1,
      
      // 获取线上线下的长度
      dataLength1: 0,
    };
  },
  components: {
    Create,
  },
  methods: {
    newclass(data) {
      API.get_class({ num: data }).then((e) => {
        if (e.data.code === 0) {
          this.tableData = e.data.data;
          this.pageSize = e.data.pageSize;
          this.dataLength = e.data.data.length;
        }
      });
    },


    createclass(form1) {
      if (this.type) {
        // 创建课程
        API.create_class({ data: form1 }).then((e) => {
          if (e.data.code === 0) {
            this.newclass(this.currentPage);
            this.$message({
              showClose: true,
              message: "创建成功",
              type: "success",
            });
            this.dialogFormVisibles = false;
            return;
          } else {
            this.$message({
              showClose: true,
              message: e.data.msg,
              type: "error",
            });
          }
        });
      } else {
        // 修改课程
        API.change_class({ data: form1 }).then((e) => {
          if (e.data.code === 0) {
            this.newclass(this.currentPage);
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
            this.dialogFormVisibles = false;
            return;
          } else {
            this.$message({
              showClose: true,
              message: e.data.msg,
              type: "error",
            });
          }
        });
      }
    },
    // 删除课程
    deleteclass(data1) {
      Object.assign(this.form1, data1);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API.delete_class({ data: { id: this.form1.id } }).then((e) => {
            if (!!this.isValue) {
              if (this.dataLength1 > 1) {
                this.getNewShow();
              } else {
                this.isShow -= 1;
                this.getNewShow();
              }
            } else {
              if (this.dataLength > 1) {
                this.newclass(this.currentPage);
              }else{
                this.currentPage -= 1;
                this.newclass(this.currentPage);
              }
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //下一页
    nextClick() {
      this.currentPage += 1;
      if (!!this.isValue) {
        this.isShow += 1;
        this.getNewShow();
        return;
      } else {
        this.newclass(this.currentPage);
      }
    },
    //上一页
    prevClick() {
      this.currentPage -= 1;
      if (!!this.isValue) {
        this.isShow -= 1;
        this.getNewShow();
        return;
      } else {
        this.newclass(this.currentPage);
      }
    },
    //当前页
    currentChange(val) {
      this.currentPage = val;
      if (!!this.isValue) {
        this.isShow = val;
        this.getNewShow();
        return;
      } else {
        this.newclass(this.currentPage);
      }
    },


    
    //改变线上线下状态
    changeShow(data) {
      Object.assign(this.value1, data);
      if (this.value1.show == 0) {
        this.value1.show = 1;
      } else {
        this.value1.show = 0;
      }

      API.change_show({ data: this.value1 }).then((e) => {
        if (!!this.isValue) {
          if (this.dataLength1 > 1) {
            this.getNewShow();
          } else {
            this.isShow -= 1;
            this.getNewShow();
          }
        } else {
          this.newclass(this.currentPage);
        }
      });
    },

    // 获取搜索到的结果
    getNewShow() {
      API.get_show({ data: this.isValue, num: this.isShow }).then((e) => {
        this.pageSize = e.data.pageSize;
        this.tableData = e.data.data;
        this.dataLength1 = e.data.data.length;
      });
    },

    // 执行调用的搜索到的值初始化
    getShow(value) {
      if (!!value) {
        this.currentPage = 1;
        this.isValue = value;
        this.isShow = 1;
        this.getNewShow();
        return;
      } else {
        this.isValue = "";
        this.currentPage = 1;
        this.newclass(this.currentPage);
      }
    },
  },
  mounted() {
    this.newclass(0);
  },
};
</script>