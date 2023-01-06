<template>
    <div class="toggle" :style="initStyle()" @click="toggle">
      <span>{{ isopen ? "收起" : "展开" }}</span>
      <i :class="isopen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
    </div>
</template>

<script>
  
  export default {
    name: 'toggleItem',
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
      open:{
        type: Boolean,
      }
    },

    data(){
      return {
        data:"",
        isopen:true,
      }
    },
    mounted(){
      this.isopen = this.$props.open;
    },
    watch:{
      "$props.open":function(val){
        this.isopen = val;
      }
    },
    methods:{
      toggle(){
        this.isopen = !this.isopen;
        this.$emit("change",this.isopen)
      },
      initStyle(){
        return `display:flex;alignItems:${this.element.options.alignItems};justifyContent:${this.element.options.justifyContent}`
      }
    }
  }
  </script>

<style scoped lang="less">
.toggle{
  cursor: pointer;
  color: #409EFF;
  font-size: 14px;
  height: 40px;
  span {
    margin-right: 5px;
  }
}
</style>
  