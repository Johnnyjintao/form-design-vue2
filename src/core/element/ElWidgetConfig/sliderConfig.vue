<!-- 滑块 -->
<template>
  <div v-if="data">

    <el-form-item label="默认内容">
      <template>
        <el-input-number
          v-if="!data.options.range"
          v-model="data.options.defaultValue"
        />
        <template v-if="data.options.range">
          <el-input-number
            v-model="data.options.defaultValue[0]"
            :max="data.options.max"
          />
          <el-input-number
            v-model="data.options.defaultValue[1]"
            :max="data.options.max"
          />
        </template>
      </template>
    </el-form-item>

    <el-form-item label="最大值" v-if="hasKey('max')">
      <el-input-number v-model.number="data.options.max" />
    </el-form-item>

    <el-form-item label="最小值" v-if="hasKey('min')">
      <el-input-number v-model.number="data.options.min" />
    </el-form-item>

    <el-form-item label="步长" v-if="hasKey('step')">
      <el-input-number v-model.number="data.options.step" :min="0" />
    </el-form-item>



    <el-form-item label="操作属性">
      <el-checkbox v-if="hasKey('rules')" v-model="data.options.rules.required">必填</el-checkbox>
      <el-checkbox v-if="hasKey('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
    </el-form-item>

    <el-alert
      title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/slider"
      type="success"
      effect="dark">
    </el-alert>

  </div>
</template>
  
  <script>
  import Draggable from 'vuedraggable'
  import SvgIcon from '@/components/SvgIcon.vue'
  
  export default {
    name: 'inputConfig',
    components: {
      Draggable,
      SvgIcon
    },
    props: {
      select: {
        type: Object
      }
    },
    emits: ['update:select'],
    data(){
      return {
        data:undefined
      }
    },
    watch:{
      data:{
        deep:true,
        handler(val){
          this.$emit('update:select',val)
        },
      },
      select:{
        deep:true,
        handler(val){
          this.data = val;
        },
      },
    },
    mounted(){
      this.data = this.$props.select;
    },
    methods:{
      hasKey(key){
        return Object.keys(this.data.options).includes(key)
      },
    }
  }
  </script>
  