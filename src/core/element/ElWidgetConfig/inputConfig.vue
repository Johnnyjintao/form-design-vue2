<!-- 输入框 -->
<template>
  <div v-if="data">
    <el-form-item label="类型">
      <el-select v-model="data.options.type">
        <el-option value="text" label="文本" />
        <el-option value="textarea" label="文本域" />
        <el-option value="number" label="数字" />
        <el-option value="password" label="密码" />
        <el-option value="tel" label="电话" />
      </el-select>
    </el-form-item>

    <el-form-item label="占位文本">
      <el-input v-model="data.options.placeholder" placeholder="输入框占位文本（placeholder）"/>
    </el-form-item>

    <el-form-item label="默认值">
      <el-input v-model="data.options.defaultValue"/>
    </el-form-item>

    <el-form-item label="最大长度">
      <el-input v-model.number="data.options.maxlength" />
    </el-form-item>

    <el-form-item label="最小长度">
      <el-input v-model.number="data.options.minlength" />
    </el-form-item>

    <el-form-item label="最大值">
      <el-input-number v-model.number="data.options.max" />
    </el-form-item>

    <el-form-item label="最小值">
      <el-input-number v-model.number="data.options.min" />
    </el-form-item>

    <el-form-item label="步长">
      <el-input-number v-model.number="data.options.step" :min="0" />
    </el-form-item>

    <el-form-item label="行数">
      <el-input-number v-model="data.options.rows" :min="0" />
    </el-form-item>

    <template>
      <el-form-item
        label="操作属性"
        v-if="
          hasKey('rules') ||
          hasKey('readonly') ||
          hasKey('disabled') ||
          hasKey('allowClear')
        "
      >
        <el-checkbox
          v-if="hasKey('rules')"
          v-model="data.options.rules.required"
          >必填</el-checkbox
        >
        <el-checkbox v-if="hasKey('readonly')" v-model="data.options.readonly"
          >只读</el-checkbox
        >
        <el-checkbox v-if="hasKey('disabled')" v-model="data.options.disabled"
          >禁用</el-checkbox
        >
        <el-checkbox v-if="hasKey('clearable')" v-model="data.options.clearable"
          >清除</el-checkbox
        >
      </el-form-item>
      <el-alert
        title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/select"
        type="success"
        effect="dark">
      </el-alert>
  
    </template>
  </div>
</template>
  
  <script>
  import SvgIcon from '@/components/SvgIcon.vue'
  
  export default {
    name: 'inputConfig',
    components: {
      SvgIcon
    },
    props: {
      select: {
        type: Object
      }
    },
    emits: ['update:select'],
    data(){
      return {
        data:undefined
      }
    },
    watch:{
      data:{
        deep:true,
        handler(val){
          this.$emit('update:select',val)
        },
      },
      select:{
        deep:true,
        handler(val){
          this.data = val;
        },
      },
    },
    mounted(){
      this.data = this.$props.select;
    },
    methods:{
      hasKey(key){
        return Object.keys(this.data.options).includes(key)
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  .el-form-item{
    margin-bottom: 10px !important;
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    .drag-li{
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 25px;
    }
  }
  .drag-item{
    font-size:24px;
    margin:0 5px;
    cursor:move;
  }
          
  
  </style>
  