<!-- 文字 -->
<template>
  <div v-if="data">
    <el-form-item label="默认内容">
      <el-input v-model="data.options.defaultValue" />
    </el-form-item>

    <el-form-item label="样式代码">
      <el-input v-model="data.options.style" />
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
  