<template>
  <div v-if="data">
    <component :is="data.type+`Config`" :select.sync="select">
    </component>
  </div>
    
  </template>
  
  <script>
  import inputConfig from './inputConfig.vue';
  export default {
    name: 'ElWidgetConfig',
    components: {
        inputConfig,
    },
    props: {
      select: {
        type: Object
      }
    },
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
  