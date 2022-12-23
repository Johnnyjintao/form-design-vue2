<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <div class="form-item-image" :style="{ width: element.options.width }">
          <el-image 
            :src="item.url"
            :style="{width:element.options.imgWidth,height:element.options.imgHeight}"
            :key="item.key"
            :preview-src-list="initPreviewSrcList(item.url,element.options.previewSrcList)"
            v-for="item of element.options.srcList">
          </el-image>  
        </div>
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'textItem',
    components: {
    },
    props: {
      config: {
        type: Object,
        required: true
      },
      element: {
        type: Object,
        required: true
      },
      model: {
        type: Object,
        required: true
      },
      disabled: {
        type: Boolean,
        required: true
      }
    },
    methods:{
      initPreviewSrcList(url,list){
        let newList = [];
        list.forEach(item=>{
          if(item.url !== url){
            newList.push(item.url)
          }
        })
        newList.unshift(url);
        return newList;
      }
    }
  }
  </script>
  

<style lang="less" scoped>
.form-item-image{
  .el-image{
    margin-right: 10px;
  }
}
</style>