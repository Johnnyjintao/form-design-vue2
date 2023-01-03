<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-radio-group
          v-model="data"
          :style="{ width: element.options.width }"
          :disabled="disabled || element.options.disabled"
          v-bind="element.options"
        >
          <el-radio
            v-for="item of element.options.options"
            :key="item.value"
            :label="item.value"
            :border="element.options.border"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
          >{{ item.label }}</el-radio>
        </el-radio-group>
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'radioItem',
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
  