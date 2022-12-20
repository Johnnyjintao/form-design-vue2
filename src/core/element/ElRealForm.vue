<template>
  <div class="fc-style">
    <el-form
      ref="formRef"
      label-suffix=":"
      :model="model"
      :rules="rules"
      :size="widgetForm.config.size"
      :label-position="widgetForm.config.labelPosition"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk"
    >
      <template v-for="(element, index) of widgetForm.list">
        <template v-if="element.type === 'grid'">
          <el-row
            type="flex"
            v-if="element.key"
            :key="element.key"
            :gutter="element.options.gutter ?? 0"
            :justify="element.options.justify"
            :align="element.options.align"
          >
            <el-col
              v-for="(col, colIndex) of element.columns"
              :key="colIndex"
              :span="col.span ?? 0"
            >
              <ElRealFormItem
                v-for="colItem of col.list"
                :model.sync="model"
                :key="colItem.key"
                :element="colItem"
                :config="data.config"
                :disabled="disabled"
              />
            </el-col>
          </el-row>
        </template>
        <ElRealFormItem
          v-else
          :model.sync="model"
          :key="element.key"
          :element="widgetForm.list[index]"
          :config="data.config"
          :disabled="disabled"
        />
      </template>
    </el-form>
  </div>
</template>

<script>
import ElRealFormItem from './ElRealFormItem.vue'
import { widgetForm } from '@/config/element'

export default {
  name: 'ElGenerateForm',
  components: {
    ElRealFormItem
  },
  props: {
    data: {
      type: Object,
      default: widgetForm
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      model: {},
      rules: {},
      widgetForm: (this.$props.data && JSON.parse(JSON.stringify(this.$props.data))) ?? widgetForm
    }
  },
  watch:{
    "$props.data":{
      deep: true,
      immediate: true ,
      handler(val){
        this.widgetForm = (val && JSON.parse(JSON.stringify(val))) ?? widgetForm;
        this.model = {};
        this.rules = {};
        this.generateModel(this.widgetForm.list);
        this.generateOptions(this.widgetForm.list);
      }
    }
  },
  mounted(){
    this.generateModel(this.widgetForm?.list ?? [])
    this.generateOptions(this.widgetForm?.list ?? [])
  },
  methods:{
    
    generateModel(list) {
      for (let index = 0; index < list.length; index++) {
        const model = list[index].model
        if (!model) {
          return
        }
        if (list[index].type === 'grid') {
          list[index].columns.forEach((col) => generateModel(col.list))
        } else {
          if (this.$props.value && Object.keys(this.$props.value).includes(model)) {
            this.$set(this.model,model,this.$props.value[model])
          } else {
            this.$set(this.model,model,list[index].options.defaultValue)
          }
          if(list[index].options.rules){
            this.$set(this.rules,model,[list[index].options.rules])
          }
        }
      }
      console.log("this.model",this.model)
      console.log("this.rules",this.rules)
    },
    generateOptions(list) {
      list.forEach(item => {
        if (item.type === 'grid') {
          item.columns.forEach((col) => generateOptions(col.list))
        } else {
          if (item.options.remote && item.options.remoteFunc) {
            fetch(item.options.remoteFunc)
              .then(resp => resp.json())
              .then(json => {
                if (json instanceof Array) {
                  item.options.remoteOptions = json.map(data => ({
                    label: data[item.options.props.label],
                    value: data[item.options.props.value],
                    children: data[item.options.props.children]
                  }))
                }
              })
          }
        }
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        console.log("this.$refs.formRef",this.$refs.formRef)
        this.$refs.formRef.validate().then((validate) => {
          if (validate) {
            resolve(this.model)
          } else {
            this.$message.error('验证失败')
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },

    reset() {
      this.$refs.formRef.resetFields()
    },
  }
}
</script>
