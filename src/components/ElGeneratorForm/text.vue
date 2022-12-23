<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <span :style="element.options.style">{{ element.options.defaultValue }}</span>
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
  }
  </script>
  