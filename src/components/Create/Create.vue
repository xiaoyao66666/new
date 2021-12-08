<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisibles"
    @close="$emit('close')"
    
  >
    <el-form :model="form1" ref="form1">
      <el-form-item label="课程名称" :label-width="formLabelWidth">
        <el-input
          v-model="form1.name"
          autocomplete="off"
          placeholder="请输入课程名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程描述" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="form1.describe"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('form1')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<style lang="less" scoped>
/deep/.el-form-item__label {
  color: #333 !important;
  width: auto !important;
}
/deep/.el-form-item__content {
  margin-left: 70px !important;
}
/deep/.el-dialog {
  width: 35% !important;
}
</style>

<script>

export default {
  name: "Create",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisibles: false,
      /* form: {
        name: "",
        describe:""
      }, */
      formLabelWidth: "120px",
    };
  },

  props: {
    dialogFormVisible: {
      type: Boolean,
    },
    form1: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  watch: {
    dialogFormVisible(newvalue) {
      this.dialogFormVisibles = newvalue;
    },
  },
  methods: {
    submitForm(form1) {
      this.$refs[form1].validate((valid) => {
        if(valid){
          this.$emit("SuccesState",this.form1)
        }else{
          console.log("error submit!!");
          return false;
        }
      }
      )}
  },
};
</script>