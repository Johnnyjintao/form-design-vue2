<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <el-form
      label-suffix=":"
      :size="widgetForm.config.size"
      :label-position="widgetForm.config.labelPosition"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk"
    >
    <Draggable class="form-d-card child" v-model="widgetForm.list" group="formdrag" 
      ghostClass="ghost"
      animation="100" @add="handleMoveAdd">
        <div @click="handleItemClick(element)" :key="element.id" class="widget-view" v-for="(element,index) of widgetForm.list">
            <el-row
              class="widget-col"
              type="flex"
              v-if="element.type === 'grid' && element.key"
              :key="element.key"
              :class="{ active: widgetFormSelect?.key === element.key }"
              :gutter="element.options.gutter ?? 0"
              :justify="element.options.justify"
              :align="element.options.align"
            >
              <el-col v-for="(col, colIndex) of element.columns" :key="colIndex" :span="col.span ?? 0" >
                <Draggable
                  class="widget-col-list"
                  item-key="key"
                  ghostClass="ghost"
                  handle=".drag-widget"
                  :animation="100"
                  group="formdrag"
                  :no-transition-on-drag="true"
                  v-model="col.list"
                  @add="handleColMoveAdd($event, element, colIndex)"
                >
                  <div :key="element.key" class="widget-view" @click.stop="handleItemClick(element)" v-for="(element,index) of col.list">
                    <transition-group name="fade" tag="div">
                      <ElWidgetFormItem
                        v-if="element.key"
                        :key="element.key"
                        :element="element"
                        :config="widgetForm.config"
                        :selectWidget="widgetFormSelect"
                        @copy="handleCopyClick(index, col.list)"
                        @delete="handleDeleteClick(index, col.list)"
                      />
                    </transition-group>
                  </div>
                </Draggable>
              </el-col>
              <div class="widget-col-action" v-if="widgetFormSelect?.key === element.key">
                <i class="el-icon-delete" @click.stop="handleDeleteClick(index, widgetForm.list)"></i>
              </div>
            </el-row>
              
            <div v-if="element.type !== 'grid' &&  element.key" @click="handleItemClick(element)">
              <ElWidgetFormItem
                :key="element.key"
                :element="element"
                :config="widgetForm.config"
                :selectWidget="widgetFormSelect"
                @copy="handleCopyClick(index, widgetForm.list)"
                @delete="handleDeleteClick(index, widgetForm.list)"
              />
            </div>
            
        </div>
    </Draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import ElWidgetFormItem from './ElWidgetFormItem.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const handleListInsert = (key, list, obj) => {
  const newList = []
  list.forEach(item => {
    if (item.key === key) {
      newList.push(item)
      newList.push(obj)
    } else {
      if (item.columns) {
        item.columns = item.columns.map((col) => ({
          ...col,
          list: handleListInsert(key, col.list, obj)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

const handleListDelete = (key, list) => {
  const newList = []
  list.forEach(item => {
    if (item.key !== key) {
      if (item.columns) {
        item.columns = item.columns.map((col) => ({
          ...col,
          list: handleListDelete(key, col.list)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

export default {
  name: 'ElWidgetForm',
  components: {
    SvgIcon,
    Draggable,
    ElWidgetFormItem
  },
  props: {
    widgetForm: {
      type: Object,
      required: true
    },
    widgetFormSelect: {
      type: Object
    }
  },
  methods:{
    handleItemClick (row) {
      this.$emit('update:widgetFormSelect', row)
    },
    handleCopyClick(index, list) {
      const key = v4().replaceAll('-', '')
      const oldList = JSON.parse(JSON.stringify(this.$props.widgetForm.list))
      let copyData = {
        ...list[index],
        key,
        model: `${list[index].type}_${key}`,
        rules: list[index].rules ?? []
      }

      if (
        list[index].type === 'radio' ||
        list[index].type === 'checkbox' ||
        list[index].type === 'select'
      ) {
        copyData = {
          ...copyData,
          options: {
            ...copyData.options,
            options: copyData.options.options.map((item) => ({ ...item }))
          }
        }
      }

      this.$emit('update:widgetForm', {
        ...this.$props.widgetForm,
        list: handleListInsert(list[index].key, oldList, copyData)
      })

      this.$emit('update:widgetFormSelect', copyData)
    },
    handleDeleteClick(index, list) {
      const oldList = JSON.parse(JSON.stringify(this.$props.widgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          this.$nextTick(() => this.$emit('update:widgetFormSelect', null))
        } else {
          this.$emit('update:widgetFormSelect', list[index - 1])
        }
      } else {
        this.$emit('update:widgetFormSelect', list[index + 1])
      }

      this.$emit('update:widgetForm', {
        ...this.$props.widgetForm,
        list: handleListDelete(list[index].key, oldList)
      })
    },
    handleMoveAdd(event){
      const { newIndex } = event
      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(this.$props.widgetForm.list))

      list[newIndex] = {
        ...list[newIndex],
        key,
        model: `${list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        list[newIndex].type === 'radio' ||
        list[newIndex].type === 'checkbox' ||
        list[newIndex].type === 'select'
      ) {
        list[newIndex] = {
          ...list[newIndex],
          options: {
            ...list[newIndex].options,
            options: list[newIndex].options.options.map((item) => ({
              ...item
            }))
          }
        }
      }

      if (list[newIndex].type === 'grid') {
        list[newIndex] = {
          ...list[newIndex],
          columns: list[newIndex].columns.map((item) => ({ ...item }))
        }
      }
      this.$emit('update:widgetForm', { ...this.$props.widgetForm, list })

      this.$emit('update:widgetFormSelect', list[newIndex])
    },
    handleColMoveAdd(event,row,index){
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(this.$props.widgetForm.list))

      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
          list.splice(oldIndex, 0, row.columns[index].list[newIndex])
        row.columns[index].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')

      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        model: `${row.columns[index].list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        row.columns[index].list[newIndex].type === 'radio' ||
        row.columns[index].list[newIndex].type === 'checkbox' ||
        row.columns[index].list[newIndex].type === 'select'
      ) {
        row.columns[index].list[newIndex] = {
          ...row.columns[index].list[newIndex],
          options: {
            ...row.columns[index].list[newIndex].options,
            options: row.columns[index].list[
              newIndex
            ].options.options.map((item) => ({ ...item }))
          }
        }
      }
      this.$emit('update:widgetFormSelect', row.columns[index].list[newIndex])
    }
  }
}
</script>
