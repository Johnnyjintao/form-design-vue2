<template>
  <el-form label-position="right" label-width="85px" size="small" v-if="data" :key="data.key">
    <el-form-item label="字段标识" v-if="data.type !== 'grid'">
      <el-input v-model="data.model" />
    </el-form-item>

    <el-form-item label="标题" v-if="data.type !== 'grid'">
      <el-input v-model="data.label" />
    </el-form-item>

    <el-form-item label="宽度" v-if="hasKey('width')">
      <el-input v-model="data.options.width" />
    </el-form-item>

    <component :is="data.type+`Config`" :select.sync="select">
    </component>
  
    <template v-if="hasKey('rules')">
      <h4>验证规则</h4>

      <el-form-item label="触发时机">
        <el-radio-group v-model="data.options.rules.trigger">
          <el-radio-button label="blur">Blur</el-radio-button>
          <el-radio-button label="change">Change</el-radio-button>
        </el-radio-group>
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
  </el-form>
</template>

<script>
import inputConfig from './inputConfig.vue';
import selectConfig from './selectConfig.vue';
import radioConfig from './radioConfig.vue';
import checkboxConfig from './checkboxConfig.vue';
import numberConfig from './numberConfig.vue';
import timeConfig from './timeConfig.vue';
import dateConfig from './dateConfig.vue';
export default {
  name: 'ElWidgetConfig',
  components: {
    inputConfig,
    selectConfig,
    radioConfig,
    checkboxConfig,
    numberConfig,
    timeConfig,
    dateConfig,
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
  