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
      :style="initFormStyle()"
    >
      <template v-for="(element, index) of widgetForm.list" v-if="initShowNum(index)">
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
              <component
                v-for="colItem of col.list"
                v-if="colItem.type!='toggle'"
                :key="colItem.key"
                :is="colItem.type+'Item'"
                :model.sync="model"
                :element="colItem"
                :config="data.config"
                :disabled="disabled"
                @change="onFormChange"
              />
            </el-col>
          </el-row>
        </template>
        <component
          v-if="widgetForm.list[index].type!='toggle'"
          :is="widgetForm.list[index].type+'Item'"
          :model.sync="model"
          :key="element.key"
          :element="widgetForm.list[index]"
          :config="data.config"
          :disabled="disabled"
          @change="onFormChange"
        />
      </template>
    </el-form>

    <toggle v-if="toggleData"
          :open="isopen"
          :model.sync="model"
          :element="toggleData"
          :config="data.config"
          @change="(val)=>{isopen=val}"></toggle>
  </div>
</template>
  
<script>
  import inputItem from './input.vue';
  import selectItem from './select.vue';
  import radioItem from './radio.vue';
  import checkboxItem from './checkbox.vue';
  import timeItem from './time.vue';
  import dateItem from './date.vue';
  import numrangeItem from './numrange.vue';
  import rateItem from './rate.vue';
  import switchItem from './switch.vue';
  import sliderItem from './slider.vue';
  import textItem from './text.vue';
  import imageItem from './image.vue';
  import toggle from './toggle.vue';

  import { widgetForm } from '@/config/element'
  
  export default {
    name: 'ElGenerateForm',
    components: {
        inputItem,
        selectItem,
        radioItem,
        checkboxItem,
        timeItem,
        dateItem,
        numrangeItem,
        rateItem,
        switchItem,
        sliderItem,
        textItem,
        imageItem,
        toggle
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
        widgetForm: (this.$props.data && JSON.parse(JSON.stringify(this.$props.data))) ?? widgetForm,
        toggleData:null,
        isopen:true,
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
        }
      }
    },
    mounted(){
      this.generateModel(this.widgetForm?.list ?? [])
    },
    methods:{
      initFormStyle(){
        if(this.toggleData && this.toggleData.options.type==='height' && this.isopen){
          return `height:auto;`
        }
        if(this.toggleData && this.toggleData.options.type==='height' && !this.isopen){
          return `height:${this.toggleData.options.height};overflow:hidden;`
        }
        return  ""
      },
      initShowNum(index){
        if(this.toggleData && this.toggleData.options.type==='num' && !this.isopen){
          let num = this.toggleData.options.num;
          if(index+1 > num){
            return false
          }
        }
        return true;
      },
     
      onFormChange(model){
        this.$emit("change",model)
      },
      generateModel(list) {
        for (let index = 0; index < list.length; index++) {
          const model = list[index].model
          if (!model) {
            return
          }
          if (list[index].type === 'grid') {
            list[index].columns.forEach((col) => this.generateModel(col.list))
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

          if(list[index].type == 'toggle'){
            this.toggleData = list[index];
            this.isopen = list[index].options.defaultValue;
          }
        }
      },

      getData() {
        return new Promise((resolve, reject) => {
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

<style lang="less" scoped>
.el-form-item{
  margin-bottom: 15px !important;
}
</style>
  