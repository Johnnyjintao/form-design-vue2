<template>
  <div class="widget-item">
    <el-form-item
      class="widget-view"
      v-if="element"
      :key="element.key"
      :class="{ active: selectWidget?.key === element.key }"
      :label="element.label"
      :rules="element.options.rules"
    >
      <template v-if="element.type === 'input'">
        <el-input
          readonly
          v-model="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="parseInt(element.options.maxlength)"
          :clearable="element.options.clearable"
          :disabled="element.options.disabled"
          v-bind="element.options"
        >
          <template #prefix v-if="element.options.prefix">
            {{ element.options.prefix }}
          </template>
          <template #suffix v-if="element.options.suffix">
            {{ element.options.suffix }}
          </template>
          <template #prepend v-if="element.options.prepend">
            {{ element.options.prepend }}
          </template>
          <template #append v-if="element.options.append">
            {{ element.options.append }}
          </template>
        </el-input>
      </template>

      <template v-if="element.type === 'select'">
        <el-select
          v-model="element.options.defaultValue"
          :multiple="element.options.multiple"
          :placeholder="element.options.placeholder"
          :clearable="element.options.clearable"
          :filterable="element.options.filterable"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        >
          <el-option
            v-for="item of element.options.options"
            :key="item.value"
            :value="item.value"
            :label="element.options.showLabel ? item.label : item.value"
          />
        </el-select>
      </template>
      <template v-if="element.type === 'radio'">
        <el-radio-group
          v-model="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :disabled="element.options.disabled"
        >
          <el-radio
            v-for="item of element.options.options"
            :key="item.value"
            :label="item.value"
            :border="element.options.border"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
            >{{ element.options.showLabel ? item.label : item.value }}</el-radio
          >
        </el-radio-group>
      </template>

      <template v-if="element.type === 'checkbox'">
        <el-checkbox-group
          v-model="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :disabled="element.options.disabled"
        >
          <el-checkbox
            v-for="item of element.options.options"
            :key="item.value"
            :label="item.value"
            :border="element.options.border"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
            >{{ element.options.showLabel ? item.label : item.value }}
          </el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="element.type === 'time'">
        <el-time-picker
          v-model="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :readonly="element.options.readonly"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :format="element.options.format"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'date'">
        <el-date-picker
          v-model="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :readonly="element.options.readonly"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :format="element.options.format"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
          :type="element.options.type"
          v-bind="element.options"
        />
      </template>

      <template v-if="element.type === 'numrange'">
          <div class="mel-range-input" :style="{ width: element.options.width }">
            <el-input
              class="range-ipt min"
              type="number"
              :placeholder="element.options.minPlaceholder"
              :maxlength="element.options.maxlength"
              v-model="element.options.minOptions"
              :disabled="element.options.disabled"
            />
            <span class="range-ipt-center">~</span>
            <el-input
              class="range-ipt max"
              type="number"
              :placeholder="element.options.maxPlaceholder"
              :maxlength="element.options.maxlength"
              v-model="element.options.max"
              :disabled="element.options.disabled"
            />
          </div>
      </template>

      <template v-if="element.type === 'rate'">
        <el-rate
          v-model="element.options.defaultValue"
          :max="element.options.max"
          :allowHalf="element.options.allowHalf"
          :disabled="element.options.disabled"
        />
      </template>



      <template v-if="element.type === 'switch'">
        <el-switch
          v-model="element.options.defaultValue"
          :active-text="element.options.activeText"
          :inactive-text="element.options.inactiveText"
          :disabled="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'slider'">
        <el-slider
          v-model="element.options.defaultValue"
          :min="element.options.min"
          :max="element.options.max"
          :step="element.options.step"
          :range="element.options.range"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type == 'text'">
        <span :style="element.options.style">{{ element.options.defaultValue }}</span>
      </template>

      <template v-if="element.type == 'image'">
        <div class="form-item-image" :style="{ width: element.options.width }">
          <el-image 
            :src="item.url"
            :style="{width:element.options.imgWidth,height:element.options.imgHeight}"
            :key="item.key"
            :preview-src-list="initPreviewSrcList(item.url,element.options.previewSrcList)"
            v-for="item of element.options.srcList">
          </el-image>  
        </div>
      </template>

      <template v-if="element.type === 'img-upload'">
        <el-upload
          :name="element.options.file"
          :action="element.options.action"
          :accept="element.options.accept"
          :file-list="element.options.defaultValue"
          :listType="element.options.listType"
          :multiple="element.options.multiple"
          :limit="element.options.limit"
          :disabled="element.options.disabled"
        >
          <SvgIcon
            v-if="element.options.listType === 'picture-card'"
            iconClass="insert"
          />
          <el-button v-else>
            <SvgIcon iconClass="img-upload" style="margin-right: 10px;" />
            点击上传
          </el-button>
        </el-upload>
      </template>

      <template v-if="element.type === 'richtext-editor'">
        <!-- <RichTextEditor
          :value="element.options.defaultValue"
          :disable="element.options.disabled"
          :style="{ width: element.options.width }"
        /> -->
      </template>

      <template v-if="element.type === 'cascader'">
        <el-cascader
          v-model="element.options.defaultValue"
          :options="element.options.remoteOptions"
          :placeholder="element.options.placeholder"
          :filterable="element.options.filterable"
          :clearable="element.options.clearable"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>
    </el-form-item>
    <div class="widget-item-action" v-if="selectWidget?.key === element.key">
      <i class="el-icon-document-copy" @click.stop="$emit('copy')"></i>
      <i class="el-icon-delete" @click.stop="$emit('delete')"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
// import RichTextEditor from '@/components/RichTextEditor.vue'

export default defineComponent({
  name: 'ElWidgetFormItem',
  components: {
    SvgIcon,
    // RichTextEditor
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
    selectWidget: {
      type: Object
    }
  },
  emits: ['copy', 'delete'],
  methods:{
    initPreviewSrcList(url,list){
      let newList = [];
      list.forEach(item=>{
        if(item.url !== url){
          newList.push(item.url)
        }
      })
      newList.unshift(url);
      return newList;
    }
  }
})
</script>
