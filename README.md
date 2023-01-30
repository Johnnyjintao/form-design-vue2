<h1>
form-design-vue 保姆级文档
</h1>

### 组件介绍
---
因维护公司的中后台项目时需要一款基于element-ui+vue2 && element-plus+vue3 && vuedraggable拖拽组件开发的一款简洁易用，功能强大的表单设计器，
发现已有的开源项目并不太适合自己使用,所以只能重复造这个轮子了，主要用于在一键CURD过程中快速设计表单，自定义生成表单布局，并且代码简洁易懂！

### 支持功能
---
- 栅格布局
- 预览
- 导入JSON
- 生成 JSON
- 生成代码

### 下载源码
---
<a href="https://github.com/Johnnyjintao/form-design-vue2" _blank>https://github.com/Johnnyjintao/form-design-vue2</a><br>
<a href="https://github.com/Johnnyjintao/form-design-vue3" _blank>https://github.com/Johnnyjintao/form-design-vue3</a>


### 使用说明
---

> vue2
``` html
<template>
  <div>
    <el-generate-form ref="generateFormRef" :data="widgetForm"></el-generate-form>
  </div>
</template>

<script >
import ElGenerateForm from "@/components/ElGenerateForm/index.vue"
export default {
  data() {
    return {
      widgetForm: {
            "list":[],
            "config":{ //config里包含的是表单属性
                "size":"default", //对齐方式 left right top
                "hideRequiredAsterisk":false,
                "labelWidth":100,
                "labelPosition":"right"
            }
        }
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

```

> vue3
``` html
<template>
  <el-generate-form ref="generateFormRef" :data="widgetForm">
  </el-generate-form>
  <el-button type="primary" @click="handleSubmit">提交</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      generateFormRef: null,
      widgetForm: {"list":[],"config":{"size":"default","hideRequiredAsterisk":false,"labelWidth":100,"labelPosition":"right"}}
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
</script>
    
```
### 图片预览
---

<table>
    <tr>
        <td><img src="https://johnnyjintao.github.io/form-design-docs/assets/img/preview01.png"/></td>
        <td><img src="https://johnnyjintao.github.io/form-design-docs/assets/img/preview02.png"/></td>
    </tr>
    <tr>
        <td><img src="https://johnnyjintao.github.io/form-design-docs/assets/img/preview03.png"/></td>
        <td><img src="https://johnnyjintao.github.io/form-design-docs/assets/img/preview04.png"/></td>
    </tr>
    <tr>
        <td><img src="https://johnnyjintao.github.io/form-design-docs/assets/img/preview05.png"/></td>
    </tr>	
</table>

> 参与贡献<br/>
> 欢迎Fork 本仓库有好的需求可以提交PR
