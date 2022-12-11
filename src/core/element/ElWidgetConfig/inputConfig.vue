<template>
    <el-form label-position="right" label-width="80px" size="small" v-if="data" :key="data.key">
      <el-form-item label="字段标识">
        <el-input v-model="data.model" />
      </el-form-item>
  
      <el-form-item label="标题">
        <el-input v-model="data.label" />
      </el-form-item>
  
      <el-form-item label="宽度">
        <el-input v-model="data.options.width" />
      </el-form-item>

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
  
        <template v-if="hasKey('rules')">
          <h4>验证规则</h4>
  
          <el-form-item label="触发时机">
            <el-radio-group v-model="data.options.rules.trigger">
              <el-radio-button label="blur">Blur</el-radio-button>
              <el-radio-button label="change">Change</el-radio-button>
            </el-radio-group>
          </el-form-item>
  
          <el-form-item label="枚举类型">
            <el-input v-model:value="data.options.rules.enum" />
          </el-form-item>
  
          <el-form-item label="字段长度">
            <el-input v-model.number="data.options.rules.len" />
          </el-form-item>
  
          <el-form-item label="最大长度">
            <el-input v-model.number="data.options.rules.max" />
          </el-form-item>
  
          <el-form-item label="最小长度">
            <el-input v-model.number="data.options.rules.min" />
          </el-form-item>
  
          <el-form-item label="校验文案">
            <el-input v-model="data.options.rules.message" />
          </el-form-item>
  
          <el-form-item label="正则表达式">
            <el-input v-model="data.options.rules.pattern" />
          </el-form-item>
  
          <el-form-item label="校验类型">
            <el-select v-model="data.options.rules.type">
              <el-option value="string">字符串</el-option>
              <el-option value="number">数字</el-option>
              <el-option value="boolean">布尔值</el-option>
              <el-option value="method">方法</el-option>
              <el-option value="regexp">正则表达式</el-option>
              <el-option value="integer">整数</el-option>
              <el-option value="float">浮点数</el-option>
              <el-option value="array">数组</el-option>
              <el-option value="object">对象</el-option>
              <el-option value="enum">枚举</el-option>
              <el-option value="date">日期</el-option>
              <el-option value="url">URL地址</el-option>
              <el-option value="hex">十六进制</el-option>
              <el-option value="email">邮箱地址</el-option>
              <el-option value="any">任意类型</el-option>
            </el-select>
          </el-form-item>
        </template>
      </template>
    </el-form>
  </template>
  
  <script>
  import Draggable from 'vuedraggable'
  import SvgIcon from '@/components/SvgIcon.vue'
  
  export default {
    name: 'inputConfig',
    components: {
      Draggable,
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
  
      handleInsertColumn(){
        this.data.columns.push({
          span: 0,
          list: []
        })
      },
  
      handleInsertOption(){
        const index = this.data.options.options.length + 1
        this.data.options.options.push({
          label: `Option ${index}`,
          value: `Option ${index}`
        })
      },
  
      handleOptionsRemove(index){
        if (this.data.type === 'grid') {
          this.data.columns.splice(index, 1)
        } else {
          this.data.options.options.splice(index, 1)
        }
      },
  
      handleSliderModeChange(checked){
        checked
          ? (this.data.options.defaultValue = [10, 90])
          : (this.data.options.defaultValue = 0)
      },
  
      handleSelectModeChange(val){
        if (this.data.type === 'img-upload') {
          return
        }
        if (val) {
          if (this.data.options.defaultValue) {
            if (!(this.data.options.defaultValue instanceof Array)) {
              this.data.options.defaultValue = [this.data.options.defaultValue]
            }
          } else {
            this.data.options.defaultValue = []
          }
        } else {
          this.data.options.defaultValue.length
            ? (this.data.options.defaultValue =
            this.data.options.defaultValue[0])
            : (this.data.options.defaultValue = null)
        }
      }
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
  