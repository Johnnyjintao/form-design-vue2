<template>
  <header class="btn-bar">
    <slot></slot>
    <el-button
      v-if="$attrs.uploadJson"
      type="text"
      @click="$emit('uploadJson')"
    >
      <template #icon>
        <SvgIcon iconClass="upload" />
      </template>
      导入JSON<SvgIcon iconClass="upload" />
    </el-button>
    <el-button
      v-if="$attrs.clearable"
      type="text"
      @click="$emit('clearable')"
    >
      <template #icon>
        <SvgIcon iconClass="clearable" />
      </template>
      清空
    </el-button>
    <el-button
      v-if="$attrs.preview"
      type="text"
      @click="$emit('preview')"
    >
      <template #icon>
        <SvgIcon iconClass="preview" />
      </template>
      预览
    </el-button>
    <el-button
      v-if="$attrs.generateJson"
      type="text"
      @click="$emit('generateJson')"
    >
      <template #icon>
        <SvgIcon iconClass="generate-json" />
      </template>
      生成JSON
    </el-button>
    <el-button
      v-if="$attrs.generateCode"
      type="text"
      @click="$emit('generateCode')"
    >
      <template #icon>
        <SvgIcon iconClass="generate-code" />
      </template>
      生成代码
    </el-button>
  </header>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'CustomHeader',
  components: {
    SvgIcon
  },
}
</script>


<style>
.btn-bar{
  display: flex;
  justify-content: flex-end;
}
</style>