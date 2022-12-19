<!-- 单选框组 -->
<template>
  <div v-if="data">
    <el-form-item label="显示边框">
      <el-switch v-model="data.options.border" />
    </el-form-item>
    
    <el-form-item label="布局方式" v-if="hasKey('inline')">
      <el-radio-group v-model="data.options.inline">
        <el-radio-button :label="true">行内</el-radio-button>
        <el-radio-button :label="false">块级</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="选项" v-if="hasKey('options')">
      <el-radio-group v-model="data.options.defaultValue" style="margin-top: 8px">
        <div v-for="(element,index) in data.options.options" style="display: flex; align-items: center; margin-bottom: 5px">
          <el-radio :label="element.value" style="margin-right: 0px; margin-bottom: 0">
            <el-input placeholder="value" v-model="element.value" :style="{width: '90px'}" />
            <el-input placeholder="label" v-model="element.label" :style="{width:'90px'}" />
            <el-button type="primary" circle @click="handleOptionsRemove(index)" :style="{marginLeft:'5px'}">
              <SvgIcon iconClass="delete" />
            </el-button>
          </el-radio>
        </div>
      </el-radio-group>
      <div style="margin-top: 5px">
        <el-button type="text" @click="handleInsertOption">添加选项</el-button>
      </div>
    </el-form-item>

    <template>
      <el-form-item label="操作属性">
        <el-checkbox v-if="hasKey('rules')" v-model="data.options.rules.required">必填</el-checkbox>
        <el-checkbox v-if="hasKey('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
      </el-form-item>
      <el-alert
        title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/radio"
        type="success"
        effect="dark">
      </el-alert>
    </template>
  </div>
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
  
  
      handleInsertOption(){
        const index = this.data.options.options.length + 1
        this.data.options.options.push({
          label: `label ${index}`,
          value: `value ${index}`
        })
      },
  
      handleOptionsRemove(index){
        if (this.data.type === 'grid') {
          this.data.columns.splice(index, 1)
        } else {
          this.data.options.options.splice(index, 1)
        }
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
  