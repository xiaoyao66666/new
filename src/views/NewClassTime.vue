<template>
  <div style="background-color: #fff; padding: 25px">
    <div style="overflow: hidden">
      <div style="float: left">
        <el-select
          v-model="value2"
          clearable
          placeholder="请选择"
          @change="getShowPeriod(value2)"
        >
          <el-option
            v-for="(item, index) of options1"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="value3"
          clearable
          placeholder="请选择"
          @change="getShow(value3)"
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
        <CreatePeriod
          :dialogFormVisible="dialogFormVisibles"
          @close="dialogFormVisibles = false"
          :form1="form1"
          :title="title"
          :className="options2"
          @SuccesState1="createClasstime"
        ></CreatePeriod>
        <el-button
          type="primary"
          @click="
            (dialogFormVisibles = true),
              (form1 = {}),
              (title = '创建课时'),
              (type = true)
          "
          >创建</el-button
        >
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="课程名" width="150">
      </el-table-column>
      <el-table-column prop="id" label="课程编号" width="280">
      </el-table-column>
      <el-table-column prop="parentId" label="所属课程" width="200">
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
          <el-button type="text" @click="getInfo(scope.row, '编辑课时')"
            >编辑</el-button
          >
          <el-button type="text" @click="deletePeriod(scope.row)"
            >删除</el-button
          >
          <el-button type="text" @click="preview(scope.row.id)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      style="padding-top: 25px"
      :page-count="pageSize"
      :current-page="currentPage"
      @next-click="nextClick"
      @prev-click="prevClick"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import { API } from "../api/api";
import CreatePeriod from "../components/CreatePeriod/CreatePeriod.vue";
import { myMixins } from "../mixins/myMixins";

export default {
  mixins: [myMixins],
  data() {
    return {
      options2: [],
      options1: [],
      parentId1: "",
      dataLength1: 0,
      value2: [],
      value3: [],
    };
  },
  components: {
    CreatePeriod,
  },
  methods: {
    get_class_hour(data) {
      API.get_period({ num: data }).then((e) => {
        if (e.data.code === 0) {
          this.tableData = e.data.data;
          this.pageSize = e.data.pageSize;
          this.dataLength = e.data.data.length;
        }
      });
    },
    newclass1() {
      API.get_class1().then((e) => {
        if (e.data.code === 0) {
          this.options2 = e.data.data;
          this.options1 = e.data.data;
        }
      });
    },

    // 创建课时
    createClasstime(form1) {
      if (this.type) {
        API.create_period({ data: form1 }).then((e) => {
          if (e.data.code === 0) {
            this.get_class_hour(this.currentPage);
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
        // 修改课时
        API.change_period({ data: form1 }).then((e) => {
          if (e.data.code === 0) {
            this.get_class_hour(this.currentPage);
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
    // 删除课时
    deletePeriod(data) {
      Object.assign(this.form1, data);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API.delete_period({ data: { id: this.form1.id } }).then((e) => {
            if (this.dataLength > 1) {
              this.get_class_hour(this.currentPage);
              return;
            }

            if (this.dataLength <= 1) {
              console.log(this.currentPage);
              this.currentPage -= 1;
              this.get_class_hour(this.currentPage);
              return;
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
    nextClick() {
      this.currentPage += 1;
      this.get_class_hour(this.currentPage);
    },
    prevClick() {
      this.currentPage -= 1;
      this.get_class_hour(this.currentPage);
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_class_hour(val);
    },

    //改变状态
    changeShow(data) {
      Object.assign(this.value1, data);
      if (this.value1.show == 0) {
        this.value1.show = 1;
      } else {
        this.value1.show = 0;
      }

      API.change_show_period({ data: this.value1 }).then((e) => {
        if (!!this.parentId1) {
          this.get_new_show();
        } else {
          this.get_class_hour(this.currentPage);
        }
      });
    },

    get_new_show() {
      API.get_show_period({ data: this.parentId1, num: this.isValue }).then(
        (e) => {
          this.tableData = e.data.data;
          this.pageSize = e.data.pageSize;
          this.dataLength1 = e.data.data.length;
        }
      );
    },

    // 选择值1
    getShowPeriod(data) {
      this.parentId1 = data;
      // 当为全部时：
      console.log("lll");
      if (!data) {
        this.get_class_hour(this.currentPage);
      } else {
        this.get_new_show();
      }
      /* if (!this.isValue) {
        if (!!this.parentId1) {
          this.getShow();
        } else {
          this.parentId1 = "";
          this.currentPage = 1;
          this.get_class_hour(1);
        }
      } */
    },

    //选择值2
    getShow(value) {
      //不为全部
      this.isValue = value;
      if (!!this.parentId1) {
        if (!!value) {
          this.isValue = value;
          this.get_new_show();
          console.log(value);
        } else {
          this.isValue = "";
        }
      } else {
        console.log("123");
        return;
      }
    },

    //预览
    preview(data) {
      console.log(data)
      API.get_class_details({ data: data }).then((e) => {
        if(e.data.code === 0){
          this.$alert(e.data.data.details, '笔记预览', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        }
      });
    },
  },
  mounted() {
    this.get_class_hour(1);

    this.newclass1();
  },
};
</script>