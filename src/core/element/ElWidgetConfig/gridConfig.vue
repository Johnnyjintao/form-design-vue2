<!-- 栅格布局 -->
<template>
  <div v-if="data">
    <el-form-item label="栅格间隔">
      <el-input-number v-model="data.options.gutter" :min="0" />
    </el-form-item>

    <el-form-item label="列配置项">
      <ul v-for="(element, index) in data.columns">
        <li style="margin-bottom: 5px">
          <el-input-number placeholder="栅格值" v-model="element.span" :min="0" :max="24" />
          <el-button type="primary" circle style="margin-left: 5px" @click="handleOptionsRemove(index)">
            <SvgIcon iconClass="delete" />
          </el-button>
        </li>
      </ul>
      <div>
        <el-button type="text" @click="handleInsertColumn">
          添加列
        </el-button>
      </div>
    </el-form-item>

    <el-form-item label="垂直对齐方式">
      <el-radio-group v-model="data.options.align">
        <el-radio-button label="top">顶部对齐</el-radio-button>
        <el-radio-button label="middle">居中对齐</el-radio-button>
        <el-radio-button label="bottom">底部对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="水平排列方式">
      <el-select v-model="data.options.justify">
        <el-option value="start" label="左对齐" />
        <el-option value="end" label="右对齐" />
        <el-option value="center" label="居中" />
        <el-option value="space-around" label="两侧间隔相等" />
        <el-option value="space-between" label="两端对齐" />
      </el-select>
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
  
      handleInsertColumn(){
        this.data.columns.push({
          span: 0,
          list: []
        })
      },
  
      handleOptionsRemove(index){
        this.data.columns.splice(index, 1)
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
  