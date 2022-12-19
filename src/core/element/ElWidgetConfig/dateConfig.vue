<!-- 日期选择器 -->
<template>
  <div v-if="data">
    <el-form-item label="类型">
      <el-select v-model="data.options.type">
        <el-option value="week" label="周" />
        <el-option value="year" label="年" />
        <el-option value="month" label="月" />
        <el-option value="dates" label="多个日期" />
        <el-option value="months" label="多个月" />
        <el-option value="years" label="多个年" />
        <el-option value="datetime" label="日期时间" />
        <el-option value="datetimerange" label="日期时间范围" />
        <el-option value="daterange" label="日期范围" />
        <el-option value="monthrange" label="月范围" />
      </el-select>
    </el-form-item>

    <el-form-item label="占位内容">
      <el-input v-model="data.options.placeholder" placeholder="字段的placeholder"/>
    </el-form-item>

    <el-form-item label="可输入">
      <el-switch v-model="data.options.editable" />
    </el-form-item>

    <el-form-item label="默认值">
      <!-- <el-time-picker
        style="width: 100%"
        v-model="data.options.defaultValue"
        :format="data.options.format"
        :placeholder="data.options.placeholder"
      /> -->

      <el-input v-model="data.options.defaultValue" placeholder="默认值"/>

    </el-form-item>

    <el-form-item label="格式">
      <el-input v-model="data.options.format" placeholder="YYYY-MM-DD"/>
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
          if(val.options.type === "datetimerange"){
            val.options.startPlaceholder = "开始日期";
            val.options.endPlaceholder = "结束日期";
            val.options["default-time"] = ["00:00:00","23:59:59"];
          }

          if(val.options.type === "datetime"){
            val.options.startPlaceholder = "开始日期";
            val.options.endPlaceholder = "结束日期";
          }

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
  