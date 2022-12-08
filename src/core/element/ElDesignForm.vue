<template>
  <div class="formDesign">
    <div class="formDesign-content">
      <div class="form-d-card left">
        <ComponentGroup title="基础组件" :list="basicComponents"/>
        <ComponentGroup title="高级组件" :list="advanceComponents"/>
        <ComponentGroup title="布局组件" :list="layoutComponents"/>
      </div>
      
      <div class="form-d-card center">
        <ElCustomHeader
          v-bind="$props"
          @preview="() => (previewVisible = true)"
          @uploadJson="() => (uploadJsonVisible = true)"
          @generateJson="handleGenerateJson"
          @generateCode="handleGenerateCode"
          @clearable="handleClearable"
        >
          <slot name="header"></slot>
        </ElCustomHeader>

        <ElWidgetForm
          ref="widgetFormRef"
          :widgetForm.sync="widgetForm"
          :widgetFormSelect.sync="widgetFormSelect"
        />
      </div>
      <div class="form-d-card right">
        <el-tabs v-model="configTab">
          <el-tab-pane label="字段属性" name="widget">
              <ElWidgetConfig v-show="configTab === 'widget'" :select.sync="widgetFormSelect"/>
          </el-tab-pane>
          <el-tab-pane label="表单属性" name="form">
              <ElFormConfig v-show="configTab === 'form'" :config.sync="widgetForm.config"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="dialog">
      
      <el-dialog :visible.sync="uploadJsonVisible" @close="(uploadJsonVisible=false)" title="导入JSON">
        <el-alert
          type="info"
          title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"
          style="margin-bottom: 10px"
        />
        <CodeEditor :value.sync="jsonEg" language="json" />
        <template #footer>
          <el-button @click="() => (uploadJsonVisible = false)">取消</el-button>
          <el-button type="primary" @click="handleUploadJson">导入</el-button>
        </template>
      </el-dialog>

      <el-dialog :visible.sync="previewVisible" title="预览" width="800">
        <ElRealForm
          ref="realFormRef"
          v-if="previewVisible"
          :data="widgetForm"
        />
        <template #footer>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleGetData">获取数据</el-button>
        </template>

        <el-dialog :visible.sync="dataJsonVisible" title="获取数据" width="800" zIndex="999">
          <CodeEditor :value.sync="dataJsonTemplate" language="json" readonly />

          <template #footer>
            <el-button @click="() => (dataJsonVisible = false)"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="handleCopyClick(dataJsonTemplate)"
              >Copy</el-button
            >
          </template>
        </el-dialog>
      </el-dialog>


    </div>
  </div>

</template>

<script>
import Draggable from "vuedraggable"
import {basicComponents,advanceComponents,layoutComponents,widgetForm} from "@/config/element"
import ComponentGroup from '@/components/ComponentGroup.vue'
import ElCustomHeader from './ElCustomHeader.vue'
import ElWidgetForm from './ElWidgetForm.vue'
import ElFormConfig from './ElFormConfig.vue'
import ElWidgetConfig from './ElWidgetConfig/index.vue'
import ElRealForm from './ElRealForm.vue'

import CodeEditor from '@/components/CodeEditor.vue'

  export default {
    name: 'ElDesignForm',
    data(){
      return {
        basicComponents,
        advanceComponents,
        layoutComponents,
        previewVisible:false,
        uploadJsonVisible:false,
        dataJsonVisible: false,
        widgetForm: JSON.parse(JSON.stringify(widgetForm)),//已选的组件列表
        widgetFormSelect: undefined,//当前选中的组件
        configTab: 'widget', //widget:字段属性 form:表单属性
        jsonEg: JSON.stringify(widgetForm, null, 2),
        dataJsonTemplate: '',
      }
    },
    components:{
      Draggable,
      ComponentGroup,
      ElCustomHeader,
      ElWidgetForm,
      ElFormConfig,
      ElWidgetConfig,
      ElRealForm,
      CodeEditor
    },
    props: {
      preview: {
        type: Boolean,
        default: true
      },
      generateCode: {
        type: Boolean,
        default: true
      },
      generateJson: {
        type: Boolean,
        default: true
      },
      uploadJson: {
        type: Boolean,
        default: true
      },
      clearable: {
        type: Boolean,
        default: true
      },
    },
    mounted(){
    },  
    methods:{
      handleReset(){
        return this.$refs.realFormRef.reset()
      },
      handleGetData() {
        this.$refs.realFormRef.getData().then((res) => {
          this.dataJsonTemplate = JSON.stringify(res, null, 2)
          this.dataJsonVisible = true
        })
      },
      handleUploadJson() {
        try {
          this.widgetForm.list = []
          this.widgetForm = {...this.widgetForm, ...JSON.parse(this.jsonEg)}
          if (this.widgetForm.list) {
            this.widgetFormSelect = this.widgetForm.list[0]
          }

          this.uploadJsonVisible = false
          this.$message.success('导入成功')
        } catch (error) {
          this.$message.error('导入失败')
        }
      },
      handleGenerateJson(){
        // this.uploadJsonVisible = true;
      },
      handleGenerateCode(){},
      handleClearable(){},
      handleMoveAdd(e){
        // let i = e.newDraggableIndex;
        // this.arr2[i].loaded = true;
        console.log("add",e.newDraggableIndex)
        // console.log("add22",typeof e.clone.attributes)
        // this.arr2.splice(e.newDraggableIndex,0,{name:e.newDraggableIndex})
      },
      
      //move回调方法
      onMove(e, originalEvent) {
        console.log(originalEvent)
        if(e?.relatedContext?.element?.id){
          this.moveId = e.relatedContext.element.id;
        //不允许停靠
        if (e.relatedContext.element.id == 1) return false;
          //不允许拖拽
          if (e.draggedContext.element.id == 4) return false;
          if (e.draggedContext.element.id == 11) return false;
        }
          return true;
      },
    },
  }
</script>

<style lang="less">
  .formDesign{
    height: 100%;
  }
  .formDesign-content{
    height: 100%;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    background: #eceef1;
    box-sizing: border-box;
  }
  .form-d-card{
    height: 100%;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    background: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    margin-right: 10px;
    position: relative;
    &:last-child{
      margin-right: 0;
    }
    &.left{
      min-width: 200px;
      max-width: 200px;
      overflow-y: auto;
    }
    &.center{
      flex: 1;
    }
    &.child{
      border: 1px dashed #222222;
      height: auto;
      position: absolute;
      width: 100%;
      left: 0px;
      right: 10px;
      bottom: 0;
      top: 60px;
      overflow-y: auto;
    }
    &.right{
      width: 350px;
    }

    .form-d-card-title{
      font-weight: 600;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }


  

  .item2{
    padding: 30px;
    border: 1px solid #222222;
  }

  .ghost{
    background: #f56c6c;
    border: 2px solid #f56c6c;
    outline-width: 0;
    height: 3px;
    box-sizing: border-box;
    font-size: 0;
    content: '';
    overflow: hidden;
    padding: 0;
  }


</style>