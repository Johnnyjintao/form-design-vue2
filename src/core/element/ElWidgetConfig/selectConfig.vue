<!-- 下拉框 -->
<template>
  <div v-if="data">
    <el-form-item label="占位文本">
      <el-input v-model="data.options.placeholder" placeholder="placeholder"/>
    </el-form-item>

    <el-form-item label="是否多选" v-if="hasKey('multiple')">
      <el-switch
        v-model="data.options.multiple"
        @change="handleSelectModeChange"
      />
    </el-form-item>

    <el-form-item label="是否可搜索" v-if="hasKey('filterable')">
      <el-switch v-model="data.options.filterable" />
    </el-form-item>


    <el-form-item label="选项" v-if="hasKey('options')">
        <ul>
          <li v-for="(element,index) in data.options.options" style="display: flex; align-items: center; margin-bottom: 5px">
            <el-checkbox-group v-if="data.options.multiple" v-model="data.options.defaultValue" style="margin-top: 8px">
              <el-checkbox :label="element.value" style="margin-right: 0px; margin-bottom: 0">
                <el-input placeholder="value" v-model="element.value" :style="{width: '90px'}" />
                <el-input placeholder="label" v-model="element.label" :style="{width:'90px'}" />
                <el-button type="primary" circle @click="handleOptionsRemove(index)" :style="{marginLeft:'5px'}">
                  <SvgIcon iconClass="delete" />
                </el-button>
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-if="!data.options.multiple" v-model="data.options.defaultValue" style="margin-top: 8px">
              <el-radio :label="element.value" style="margin-right: 0px; margin-bottom: 0">
                <el-input placeholder="value" v-model="element.value" :style="{width: '90px'}" />
                <el-input placeholder="label" v-model="element.label" :style="{width:'90px'}" />
                <el-button type="primary" circle @click="handleOptionsRemove(index)" :style="{marginLeft:'5px'}">
                  <SvgIcon iconClass="delete" />
                </el-button>
              </el-radio>
            </el-radio-group>
          </li>
        </ul>
      <div style="margin-top: 5px">
        <el-button type="text" @click="handleInsertOption">添加选项</el-button>
      </div>
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
        <el-checkbox v-if="hasKey('rules')" v-model="data.options.rules.required">必填</el-checkbox>
        <el-checkbox v-if="hasKey('readonly')" v-model="data.options.readonly">只读</el-checkbox>
        <el-checkbox v-if="hasKey('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
        <el-checkbox v-if="hasKey('clearable')" v-model="data.options.clearable">清除</el-checkbox>
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
  import Draggable from 'vuedraggable'
  import SvgIcon from '@/components/SvgIcon.vue'
  
  export default {
    name: 'inputConfig',
    components: {
      Draggable,
      SvgIcon,
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
  