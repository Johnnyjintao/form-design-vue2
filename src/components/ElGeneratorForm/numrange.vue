<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <div class="mel-range-input" :style="{ width: element.options.width }">
        <el-input
          class="range-ipt min"
          type="number"
          :placeholder="element.options.minPlaceholder"
          :maxlength="element.options.maxlength"
          v-model="element.options.minOptions"
          :disabled="element.options.disabled"
        />
        <span class="range-ipt-center">~</span>
        <el-input
          class="range-ipt max"
          type="number"
          :placeholder="element.options.maxPlaceholder"
          :maxlength="element.options.maxlength"
          v-model="element.options.max"
          :disabled="element.options.disabled"
        />
      </div>
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'numrangeItem',
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

    data(){
      return {
        data:"",
      }
    },
    mounted(){
      this.data = this.$props.model[this.$props.element.model];
    },
    watch:{
      data(val){
        let newmodel = this.$props.model;
        newmodel[this.$props.element.model] = val
        this.$emit("change",newmodel)
      },
    },
    methods:{
      
    }
  }
  </script>
  
<style lang="less" scoped>
.mel-range-input {
  display: inline-block;
  .range-ipt-center {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
  .range-ipt {
    width: 45%;
    text-align: center;
    &.min {
      border-right: 0;
    }
    &.max {
      border-left: 0;
    }
  }
}
</style>