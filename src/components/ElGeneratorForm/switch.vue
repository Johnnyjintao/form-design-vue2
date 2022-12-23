<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-switch
        v-model="data"
        :active-text="element.options.activeText"
        :inactive-text="element.options.inactiveText"
        :disabled="disabled || element.options.disabled"
      />
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'switchItem',
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
  