<template>
  <div class="form-config-container">
    <el-form label-position="right" label-width="100px" size="small">
      <el-form-item label="对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="标签宽度">
        <el-input type="number" v-model="data.labelWidth" :min="0" />
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size">
          <el-radio-button label="large">大</el-radio-button>
          <el-radio-button label="default">默认</el-radio-button>
          <el-radio-button label="small">小</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="隐藏必选标记">
        <el-switch v-model="data.hideRequiredAsterisk" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'ElFormConfig',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ['update:config'],
  data(){
    return {
      data:{}
    }
  },
  watch:{
    data(val){
      this.$emit('update:config',val)
    },
    config(val){
      this.data = val;
    },
  },
  mounted(){
    this.data = this.$props.config;
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 10px !important;
}
</style>
