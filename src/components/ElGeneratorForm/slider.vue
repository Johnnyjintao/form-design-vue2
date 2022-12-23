<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-slider
          v-model="data"
          :min="element.options.min"
          :max="element.options.max"
          :step="element.options.step"
          :range="element.options.range"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        />
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'sliderItem',
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
        data:0,
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
  