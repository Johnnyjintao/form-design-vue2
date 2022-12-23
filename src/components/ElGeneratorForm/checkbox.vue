<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-checkbox-group
        v-model="data"
        :style="{ width: element.options.width }"
        :disabled="disabled || element.options.disabled"
        v-bind="element.options"
      >
        <el-checkbox
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :border="element.options.border"
          :style="{
            display: element.options.inline ? 'inline-block' : 'block'
          }"
        >
          {{
            item.label
          }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </template>
  
  <script>
  
  export default {
    name: 'checkboxItem',
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
        data:[],
      }
    },
    mounted(){
      this.data = this.$props.model[this.$props.element.model]||[];
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
  