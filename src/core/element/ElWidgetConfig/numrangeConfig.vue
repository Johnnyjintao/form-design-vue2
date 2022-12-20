<!-- 数字范围输入框 -->
<template>
  <div v-if="data">
    <el-form-item label="最小值占位内容">
      <el-input v-model="data.options.minPlaceholder" placeholder="字段的placeholder"/>
    </el-form-item>
    <el-form-item label="最大值占位内容">
      <el-input v-model="data.options.maxPlaceholder" placeholder="字段的placeholder"/>
    </el-form-item>

    <el-form-item label="操作属性">
      <el-checkbox v-if="hasKey('rules')" v-model="data.options.rules.required">必填</el-checkbox>
      <el-checkbox v-if="hasKey('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
    </el-form-item>
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
  