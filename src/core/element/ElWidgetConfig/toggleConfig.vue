<!-- 文字 -->
<template>
  <div v-if="data">
    <el-form-item label="默认值">
      <el-switch v-model="data.options.defaultValue" active-text="收起" inactive-text="展开"/>
    </el-form-item>

    <el-form-item label="水平布局">
      <el-select v-model="data.options.justifyContent">
        <el-option value="center" label="居中" />
        <el-option value="flex-start" label="左对齐" />
        <el-option value="flex-end" label="右对齐" />
      </el-select>
    </el-form-item>

    <el-form-item label="垂直布局">
      <el-select v-model="data.options.alignItems">
        <el-option value="center" label="居中" />
        <el-option value="flex-start" label="上对齐" />
        <el-option value="flex-end" label="下对齐" />
      </el-select>
    </el-form-item>

    <el-form-item label="类型">
      <el-select v-model="data.options.type">
        <el-option value="height" label="按高度展开收起" />
        <el-option value="num" label="按组件个数展开收起" />
      </el-select>
    </el-form-item>

    <el-form-item label="高度" v-if="data.options.type=='height'">
      <el-input v-model="data.options.height"/>
    </el-form-item>
   
    <el-form-item label="个数" v-if="data.options.type=='num'">
      <el-input v-model="data.options.num" type="number"/>
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
  