<template>
  <div class="widget">
    <div class="widget-cate">{{ title }}</div>
    <div class="widget-list">
      <Draggable 
        :list="list"
        :options="{group:{name: 'itxst',pull:'clone',put:false}}"
        :sort=false
        animation="300"
        >
          <transition-group>
              <div class="widget-item" v-for="listitem in list" :key="listitem.type">
                {{listitem.label}}
              </div>
          </transition-group>
      </Draggable>
    </div>
    
  </div>
  
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from './SvgIcon.vue'

export default defineComponent({
  name: 'ComponentGroup',
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      required: true
    }
  }
})
</script>

<style lang="less" scoped>
.widget-cate{
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
}
.widget-list{
  overflow: hidden;
  .widget-item{
    font-size: 12px;
    float: left;
    padding: 5px 10px;
    border: 1px solid #222222;
    border-radius: 5px;
    margin: 0 10px 10px 0;
    cursor: all-scroll;
  }
}

</style>