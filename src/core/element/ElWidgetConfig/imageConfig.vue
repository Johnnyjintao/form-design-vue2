<!-- 图片 -->
<template>
  <div v-if="data">
    <el-form-item label="图片宽度">
      <el-input v-model="data.options.imgWidth"></el-input>
    </el-form-item>
    <el-form-item label="图片高度">
      <el-input v-model="data.options.imgWidth"></el-input>
    </el-form-item>
    <el-form-item label="图片列表">
      <ul>
        <li v-for="(element,index) in data.options.srcList" style="display: flex; align-items: center; margin-bottom: 5px">
          <el-input v-model="element.url" placeholder="请输入图片地址"></el-input>
          <el-button type="primary" circle @click="srcListRemove(index)" :style="{marginLeft:'5px'}">
            <SvgIcon iconClass="delete" />
          </el-button>
        </li>
      </ul>
      <div style="margin-top: 5px">
        <el-button type="text" @click="srcListInsert">添加选项</el-button>
      </div>
    </el-form-item>

    <el-form-item label="预览列表">
      <ul>
        <li v-for="(element,index) in data.options.previewSrcList" style="display: flex; align-items: center; margin-bottom: 5px">
          <el-input v-model="element.url" placeholder="请输入图片地址"></el-input>
          <el-button type="primary" circle @click="previewSrcListRemove(index)" :style="{marginLeft:'5px'}">
            <SvgIcon iconClass="delete" />
          </el-button>
        </li>
      </ul>
      <div style="margin-top: 5px">
        <el-button type="text" @click="previewSrcListInsert">添加选项</el-button>
      </div>
    </el-form-item>
  </div>
</template>

<script>
  import SvgIcon from '@/components/SvgIcon.vue'
  
  export default {
    name: 'imageConfig',
    components: {
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
  
      srcListInsert(){
        this.data.options.srcList.push({url:""})
      },
  
      srcListRemove(index){
        this.data.options.srcList.splice(index, 1)
      },

      previewSrcListInsert(){
        this.data.options.previewSrcList.push({url:""})
      },
  
      previewSrcListRemove(index){
        this.data.options.previewSrcList.splice(index, 1)
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
  