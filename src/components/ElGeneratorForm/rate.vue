<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      {{ data }}
      <el-rate
          v-model="data"
          :max="element.options.max"
          :allowHalf="element.options.allowHalf"
          :disabled="disabled || element.options.disabled"
        />
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'rateItem',
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
  