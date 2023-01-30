export default function(
  widgetForm,
  codeType,
  platformType
) {
  if (codeType === "vue") {
    return `<template>
  <div>
    <el-generate-form ref="generateFormRef" :data="widgetForm"></el-generate-form>
  </div>
</template>

<script >
import ElGenerateForm from "@/components/ElGenerateForm/index.vue"
export default {
  data() {
    return {
      widgetForm: ${JSON.stringify(widgetForm)}
    };
  },
  components: {
    ElGenerateForm
  },
  methods: {
  },
  mounted() {
  }
};

</script>
    `
  }
  if (codeType === "html") {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
      <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css" />
  </head>
  <body>
    <div id="app">
      <el-generate-form ref="generateFormRef" :data="widgetForm">
      </el-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
    <script src="https://unpkg.com/vue@next/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/vue-form-create/dist/formCreate.umd.min.js"></script>
    <script src="https://unpkg.com/ace-builds/src-noconflict/ace.js"></script>
    <script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
    <script>
      const { createApp, reactive, toRefs } = Vue

      createApp({
        setup() {
          const state = reactive({
            generateFormRef: null,
            widgetForm: ${JSON.stringify(widgetForm)}
          })
      
          const handleSubmit = () => {
            state.generateFormRef.getData().then(data => {
              console.log(data)
              // data success
              // data 表单数据
            }).catch(error => {
              // data failed
            })
          }
      
          return {
            ...toRefs(state),
            handleSubmit
          }
        }
      })
      .use(Element-UI)
      .use(formCreate)
      .mount('#app')
    </script>
  </body>
</html>
    `
  }
}
