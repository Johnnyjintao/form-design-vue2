<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-date-picker
        v-model="data"
        :placeholder="element.options.placeholder"
        :readonly="element.options.readonly"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :format="element.options.format"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
        v-bind="element.options"
      />
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'dateItem',
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
  